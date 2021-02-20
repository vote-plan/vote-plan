import {ParserBase} from '../parser-base';
import {DataSet} from '../../src/app/elections/data-set';
import * as path from 'path';
import {CodeBuilder} from '../code-builder';
import {factory} from '../logging';
import {AuCsvHeader, ParserAuCsv} from '../parser-au-csv';


/**
 * Parser for 2019 Australian election.
 *
 * webpage: https://www.aec.gov.au/Elections/federal_elections/2019/candidates.htm
 * direct link: https://www.aec.gov.au/Elections/federal_elections/2019/files/2019federalelection-all-candidates-nat-17-05.csv
 * Accessed 2020-01-19
 */
export class Parser extends ParserBase {
  private readonly baseCode = '2019-05-18-au';
  private readonly logger = factory.getLogger(this.baseCode);

  private readonly codeBuilder: CodeBuilder;

  private readonly inputFile: string = 'raw-input.csv';
  private readonly parserCsv: ParserAuCsv;

  constructor(codeBuilder: CodeBuilder, parserCsv: ParserAuCsv) {
    super();
    this.codeBuilder = codeBuilder;
    this.parserCsv = parserCsv;
  }

  parse(baseCode?: string, input?: any): DataSet {
    this.logger.info(`Started parsing data.`);

    const dataRaw = this.readCsvFile(path.join(__dirname, this.inputFile)) as AuCsvHeader;
    let parsed = this.parserCsv.parse(this.baseCode, dataRaw);

    const result = this.mergeDataSets(parsed);

    const resultInfo = this.buildDataSetCounts(result);
    this.logger.info(`Finished '${this.baseCode}' with ${resultInfo}.`);

    return result;
  }

  write(baseDir: string, input: DataSet): void {
    let target = path.resolve(baseDir, `./${this.baseCode}.json`);
    this.writeJsonFile(target, input);
  }

}
