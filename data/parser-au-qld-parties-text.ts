import {Parser} from './parser';
import {DataSet} from '../src/app/elections/data-set';
import {CodeBuilder} from './code-builder';
import {trimAny} from './extensions';
import {Party} from '../src/app/elections/party';
import {Note} from '../src/app/elections/note';
import {factory} from './logging';
import {ParserBase} from './parser-base';

export class ParserAuQldPartiesText extends ParserBase implements Parser {
  private readonly codeBuilder: CodeBuilder;
  private readonly logger = factory.getLogger('ParserAuQldPartiesText');

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

    this.logger.info(`Parsing ${input.length} lines for parties in '${baseCode}'.`);

    const electionCode = this.codeBuilder.election(baseCode);

    const regOfficer = 'Registered Officer';
    const regDate = 'Date of Registration';

    let currentParty: Party = {
      candidateCodes: [],
      code: '',
      description: '',
      electionCode: electionCode,
      noteCodes: [],
      title: ''
    };
    for (const partyRaw of input) {
      const currentLine = trimAny(partyRaw, '\r\n');

      if (!currentLine.trim()) {
        // blank lines are the end of the current
        if (currentParty) {

          if (currentParty.description && !currentParty.title) {
            currentParty.title = currentParty.description;
          }

          currentParty.code = this.codeBuilder.party(baseCode, currentParty.title);
          result.parties.push(currentParty);
        }

        currentParty = {
          candidateCodes: [],
          code: '',
          description: '',
          electionCode: electionCode,
          noteCodes: [],
          title: ''
        };

      } else if (currentLine.startsWith('Name of Political Party\t')) {
        currentParty.description = trimAny(currentLine.split('\t')[1], '\r\n');

      } else if (currentLine.startsWith('Abbreviation\t')) {
        currentParty.title = trimAny(currentLine.split('\t')[1], '\r\n');

      } else if (currentLine.startsWith(regOfficer + '\t')) {
        const content = trimAny(currentLine.split('\t')[1], '\r\n');
        const note: Note = {
          code: this.codeBuilder.note(baseCode, regOfficer, currentParty.title),
          description: content,
          noteType: 'content',
          title: regOfficer
        };
        result.notes.push(note);
        currentParty.noteCodes.push(note.code);

      } else if (currentLine.startsWith(regDate + '\t')) {
        const content = trimAny(currentLine.split('\t')[1], '\r\n');
        const note: Note = {
          code: this.codeBuilder.note(baseCode, regDate, currentParty.title),
          description: content,
          noteType: 'content',
          title: regDate
        };
        result.notes.push(note);
        currentParty.noteCodes.push(note.code);

      } else {
        throw new Error(`Unrecognised line identifier '${currentLine}'.`);
      }
    }

    const resultInfo = this.buildDataSetCounts(result);
    this.logger.info(`Finished '${electionCode}' with ${resultInfo}.`);

    return result;
  }

}
