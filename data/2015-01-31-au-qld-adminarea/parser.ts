import {ParserBase} from '../parser-base';
import {DataSet} from '../../src/app/elections/data-set';
import {ParserAuQldPartiesText} from '../parser-au-qld-parties-text';
import {ParserAuQldCandidatesText} from '../parser-au-qld-candidates-text';
import * as path from 'path';
import {CodeBuilder} from '../code-builder';
import {factory} from '../logging';


/**
 * Parser for 2015 Queensland, Australia election.
 *
 * - Candidates: https://results.ecq.qld.gov.au/elections/state/State2015/candidates.html
 * - Parties: https://results.ecq.qld.gov.au/elections/state/State2015/parties.html
 * - Accessed 2020-01-19
 */
export class Parser extends ParserBase {
  private readonly baseCode = '2015-01-31-au-qld';
  private readonly logger = factory.getLogger(this.baseCode);

  private readonly codeBuilder: CodeBuilder;

  private readonly inputCandidatesFile: string = 'raw-candidates.txt';
  private readonly parserCandidates: ParserAuQldCandidatesText;

  private readonly inputPartiesFile: string = 'raw-parties.txt';
  private readonly parserParties: ParserAuQldPartiesText;

  // TODO
  private readonly country = 'Australia';
  private readonly coverage_type = 'State';
  private readonly institution = 'Parliament';
  private readonly administrative_area = 'Queensland';
  private readonly assembly_title = 'Legislative Assembly';

  constructor(codeBuilder: CodeBuilder, parserCandidates: ParserAuQldCandidatesText, parserParties: ParserAuQldPartiesText) {
    super();
    this.codeBuilder = codeBuilder;
    this.parserCandidates = parserCandidates;
    this.parserParties = parserParties;
  }

  parse(baseCode?: string, input?: any): DataSet {
    this.logger.info(`Started parsing data.`);

    const candidatesRaw = this.readTextFile(path.join(__dirname, this.inputCandidatesFile));
    let candidates = this.parserCandidates.parse(this.baseCode, candidatesRaw);

    const partiesRaw = this.readTextFile(path.join(__dirname, this.inputPartiesFile));
    let parties = this.parserParties.parse(this.baseCode, partiesRaw);

    const result = this.mergeDataSets(candidates, parties);

    const resultInfo = this.buildDataSetCounts(result);
    this.logger.info(`Finished '${this.baseCode}' with ${resultInfo}.`);

    return result;
  }

  write(baseDir: string, input: DataSet): void {
    let target = path.resolve(baseDir, `./${this.baseCode}.json`);
    this.writeJsonFile(target, input);
  }

}
