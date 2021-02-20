import {ParserBase} from '../parser-base';
import {factory} from '../logging';
import {CodeBuilder} from '../code-builder';
import {DataSet} from '../../src/app/elections/data-set';
import * as path from 'path';
import {ParserAuActCsv} from '../parser-au-act-csv';


export class Parser extends ParserBase {
  private readonly baseCode = '2016-10-15-au-act';
  private readonly logger = factory.getLogger(this.baseCode);

  private readonly codeBuilder: CodeBuilder;

  private readonly inputCandidateFile: string = 'Candidates.csv';
  private readonly inputElectoratesFile: string = 'Electorates.csv';
  private readonly inputGroupsFile: string = 'Groups.csv';
  private readonly parserCsv: ParserAuActCsv;

  constructor(codeBuilder: CodeBuilder, parserCsv: ParserAuActCsv) {
    super();
    this.codeBuilder = codeBuilder;
    this.parserCsv = parserCsv;
  }

  parse(baseCode?: string, input?: any): DataSet {
    this.logger.info(`Started parsing data.`);

    const candidateRaw = this.readCsvFile(path.join(__dirname, this.inputCandidateFile));
    const electoratesRaw = this.readCsvFile(path.join(__dirname, this.inputElectoratesFile));
    const groupsRaw = this.readCsvFile(path.join(__dirname, this.inputGroupsFile));
    let parsed = this.parserCsv.parse(this.baseCode, {candidates: candidateRaw, electorates: electoratesRaw, groups: groupsRaw});

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
