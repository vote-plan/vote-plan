import {Parser} from './parser';
import * as fs from 'fs';
import * as csvParse from 'csv-parse/lib/sync';
import {DataSet} from '../src/app/elections/data-set';
import {ElectionEntity} from '../src/app/elections/election-entity';


/**
 * The abstract base parser class.
 */
export abstract class ParserBase implements Parser {

  /**
   * Parse internal data or input, optionally with the baseCode.
   * @param baseCode
   * @param input
   */
  abstract parse(baseCode?: string, input?: any): DataSet;

  /**
   * Write internal data or input to the internal location or path.
   * @param baseDir
   * @param input
   */
  abstract write(baseDir?: string, input?: DataSet): void;

  /**
   *
   * @param path
   * @protected
   */
  protected readTextFile(path: string): string[] {
    return fs.readFileSync(path, 'utf8').split('\n');
  }

  /**
   *
   * @param path
   * @param content
   * @protected
   */
  protected writeTextFile(path: string, content: string): void {
    fs.writeFileSync(path, content, 'utf8');
  }

  /**
   *
   * @param path
   * @protected
   */
  protected readXmlFile(path: string): object {
    const content = fs.readFileSync(path, 'utf8');
    const parseString = require('xml2js').parseString;
    return parseString(content, {trim: true, async: false}, (err: any, result: any) => result);
  }

  /**
   *
   * @param path
   * @protected
   */
  protected readCsvFile(path: string): object {
    // columns: true treats the first line as the column headers
    const content = fs.readFileSync(path, 'utf8');
    return csvParse(content, {
      delimiter: ',',
      columns: true,
      skip_empty_lines: true
    });
  }

  /**
   *
   * @param path
   * @protected
   */
  protected readJsonFile(path: string): object {
    const content = fs.readFileSync(path, 'utf8');
    return JSON.parse(content);
  }

  /**
   *
   * @param path
   * @param content
   * @protected
   */
  protected writeJsonFile(path: string, content: object): void {
    const data = JSON.stringify(content);
    fs.writeFileSync(path, data, 'utf8');
  }

  protected buildDataSetCounts(dataSet: DataSet): string {
    const resultMap = new Map<string, number>();
    if (dataSet.assemblies.length > 0) {
      resultMap.set('assemblies', dataSet.assemblies.length);
    }
    if (dataSet.ballotEntries.length > 0) {
      resultMap.set('ballot entries', dataSet.ballotEntries.length);
    }
    if (dataSet.ballotSections.length > 0) {
      resultMap.set('ballot sections', dataSet.ballotSections.length);
    }
    if (dataSet.candidates.length > 0) {
      resultMap.set('candidates', dataSet.candidates.length);
    }
    if (dataSet.elections.length > 0) {
      resultMap.set('elections', dataSet.elections.length);
    }
    if (dataSet.electorates.length > 0) {
      resultMap.set('electorates', dataSet.electorates.length);
    }
    if (dataSet.locations.length > 0) {
      resultMap.set('locations', dataSet.locations.length);
    }
    if (dataSet.notes.length > 0) {
      resultMap.set('notes', dataSet.notes.length);
    }
    if (dataSet.parties.length > 0) {
      resultMap.set('parties', dataSet.parties.length);
    }

    const items: string[] = [];
    resultMap.forEach(function(value, key) {
      items.push(`${value} ${key}`);
    });
    return items.join(', ');
  }

  /**
   * Merge two or more data sets to produce one data set with distinct items.
   * @param dataSets
   * @protected
   */
  protected mergeDataSets(...dataSets: DataSet[]): DataSet {
    var dataset: DataSet = {
      assemblies: [],
      ballotEntries: [],
      ballotSections: [],
      candidates: [],
      elections: [],
      electorates: [],
      locations: [],
      notes: [],
      parties: []
    };

    const stringArrayFields = [
      'ballotSectionCodes',
      'ballotEntryCodes',
      'electorateCodes',
      'assemblyCodes',
      'candidateCodes',
      'partyCodes',
      'noteCodes',
    ];

    const stringFields = [
      'electionCode',
      'assemblyCode',
      'candidateCode',
      'electorateCode',
      'partyCode',
      'ballotEntryCode',

      'position',
      'nameFirst',
      'nameLast',
      'institution',
      'coverageType',
      'held',
      'locationCode',
      'noteType',
      'administrativeDivision1Title',
      'administrativeDivision1Code',
      'administrativeDivision2Title',
      'administrativeDivision2Code',
      'administrativeDivision3Title',
      'administrativeDivision3Code',
    ];

    return dataSets.reduce((dataSet: DataSet, current: DataSet) => {

      // Iterate through each ElectionEntity sub class in the dataset.
      Object.keys(dataSet).forEach(field => {
        let aggregateItems: ElectionEntity[] = Reflect.get(dataSet, field);
        let currentItems: ElectionEntity[] = Reflect.get(current, field);
        let allItems: ElectionEntity[] = aggregateItems.concat(currentItems);

        // Group by code - this assumes that the same entities will have the same codes.
        // This may not be true due to misspelling or missing names.
        let groupedItems = allItems.reduce((mapAgg, mapCur) => {
          let mapKey = mapCur.code;
          let values = mapAgg.has(mapKey) ? (mapAgg.get(mapKey) ?? []) : [];
          values.push(mapCur);
          mapAgg.set(mapKey, values);
          return mapAgg;
        }, new Map<string, ElectionEntity[]>());

        // Merge all fields for each group of ElectionEntity instances to create one instance.
        let values: ElectionEntity[] = [];
        groupedItems.forEach((groupValues, groupKey) => {

          let value = groupValues.reduce((groupAgg, groupCur) => {

            stringFields.forEach(stringField => {
              if (Reflect.has(groupAgg, stringField) && Reflect.has(groupCur, stringField)) {
                let aggValue = Reflect.get(groupAgg, stringField);
                let curValue = Reflect.get(groupCur, stringField);
                if (Reflect.get(groupAgg, stringField) != Reflect.get(groupCur, stringField)) {
                  throw new Error(`Field '${stringField}' values do not match: '${groupAgg.code}':'${aggValue}' != '${groupCur.code}':'${curValue}'.`);
                }
              }
            });

            stringArrayFields.forEach(stringArrayField => {
              if (Reflect.has(groupAgg, stringArrayField) && Reflect.has(groupCur, stringArrayField)) {
                let aggValue: string[] = Reflect.get(groupAgg, stringArrayField);
                let curValue: string[] = Reflect.get(groupCur, stringArrayField);

                // Keep only unique values, maintaining the order of the string array field.
                // Keep unique by getting the first index of the value, and comparing that to the index of the current value.
                let newValue = aggValue.concat(curValue).filter((v, i, a) => a.indexOf(v) === i);
                Reflect.set(groupAgg, stringArrayField, newValue);
              }
            });

            return groupAgg;
          });

          values.push(value);
        });

        Reflect.set(dataSet, field, values);
      });

      return dataSet;
    }, dataset);
  }
}
