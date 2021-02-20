import {Parser} from './parser';
import {DataSet} from '../src/app/elections/data-set';
import {Electorate} from '../src/app/elections/electorate';
import {titleCase, trimAny} from './extensions';
import {Candidate} from '../src/app/elections/candidate';
import {Party} from '../src/app/elections/party';
import {CodeBuilder} from './code-builder';
import {factory} from './logging';
import {ParserBase} from './parser-base';


export class ParserAuQldCandidatesText extends ParserBase implements Parser {
  private readonly codeBuilder: CodeBuilder;
  private readonly logger = factory.getLogger('ParserAuQldCandidatesText');

  constructor(codeBuilder: CodeBuilder) {
    super();
    this.codeBuilder = codeBuilder;
  }

  write(baseDir?: string, input?: DataSet): void {
    throw new Error('Method not implemented.');
  }

  parse(baseCode: string, input: any): DataSet {
    // input is the raw lines of text

    let result: DataSet = {
      assemblies: [],
      ballotEntries: [],
      ballotSections: [],
      candidates: [],
      elections: [],
      electorates: [],
      locations: [],
      notes: [],
      parties: [],
    };

    this.logger.info(`Parsing ${input.length} lines for candidates in '${baseCode}'.`);

    const electionCode = this.codeBuilder.election(baseCode);
    let currentElectorateCode = '';

    let currentElectorate: Electorate = ParserAuQldCandidatesText.newElectorate();
    for (const candidateRaw of input) {
      const currentLine = trimAny(candidateRaw, '\r\n');

      if (!currentLine.trim()) {
        // blank lines are the end of the current electorate
        if (currentElectorate) {
          result.electorates.push(currentElectorate);
        }
        currentElectorate = ParserAuQldCandidatesText.newElectorate();
        currentElectorateCode = '';

      } else if (currentLine === 'Top') {
        // nothing to do

      } else if (currentLine.startsWith(' \t')) {

        const items = currentLine.trim().split('\t');

        const candidateName = items[0];
        const candidateNameSplit = candidateName.split(', ');
        const candidateLastName = titleCase(candidateNameSplit[0]);
        const candidateFirstName = titleCase(candidateNameSplit[1]);
        const candidateFullName = candidateLastName + ', ' + candidateFirstName;

        if (items.length < 2 || !items[1]) {
          items[1] = this.codeBuilder.defaultPartyName();
        }

        const partyName = titleCase(items[1]);
        const partyCode = this.codeBuilder.party(baseCode, partyName);

        const candidateCode = this.codeBuilder.candidate(baseCode, candidateFullName, partyName);

        // party
        const party: Party = {
          candidateCodes: [],
          code: partyCode,
          description: '',
          electionCode: electionCode,
          noteCodes: [],
          title: partyName,
        };
        result.parties.push(party);

        // candidate
        const candidate: Candidate = {
          assemblyCode: '',
          ballotEntryCode: '',
          code: candidateCode,
          description: '',
          electionCode: electionCode,
          electorateCode: currentElectorateCode,
          nameFirst: candidateFirstName,
          nameLast: candidateLastName,
          noteCodes: [],
          partyCode: partyCode,
          title: candidateFullName,
        };
        result.candidates.push(candidate);
        currentElectorate.candidateCodes.push(candidateCode);
        party.candidateCodes.push(candidateCode);

      } else {

        currentElectorateCode = this.codeBuilder.electorate(baseCode, currentLine);

        currentElectorate = ParserAuQldCandidatesText.newElectorate();
        currentElectorate.code = currentElectorateCode;
        currentElectorate.electionCode = electionCode;
        currentElectorate.title = currentLine;
      }
    }

    const resultInfo = this.buildDataSetCounts(result);
    this.logger.info(`Finished '${electionCode}' with ${resultInfo}.`);

    return result;
  }

  private static newElectorate(): Electorate {
    return {
      assemblyCode: '',
      candidateCodes: [],
      code: '',
      description: '',
      electionCode: '',
      noteCodes: [],
      title: ''
    };
  }

}
