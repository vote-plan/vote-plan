import {ParserBase} from './parser-base';
import {Parser} from './parser';
import {CodeBuilder} from './code-builder';
import {factory} from './logging';
import {DataSet} from '../src/app/elections/data-set';
import {titleCase} from './extensions';
import {Electorate} from '../src/app/elections/electorate';
import {Candidate} from '../src/app/elections/candidate';
import {Party} from '../src/app/elections/party';

export interface AuActCsvCandidateHeader {
  ecode: number
  pcode: number
  ccode: number
  cname: string
}

export interface AuActCsvGroupHeader {
  ecode: number
  pcode: number
  pname: string
  pabbrev: string
  cands: number
}

export interface AuActCsvElectorateHeader {
  ecode: number
  electorate: string
}

export class ParserAuActCsv extends ParserBase implements Parser {
  private readonly codeBuilder: CodeBuilder;
  private readonly logger = factory.getLogger('ParserAuActCsv');

  constructor(codeBuilder: CodeBuilder) {
    super();
    this.codeBuilder = codeBuilder;
  }

  parse(baseCode: string, input: any): DataSet {
    // input is an object with properties where the values are arrays of csv rows

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

    this.logger.info(`Parsing ${input.electorates.length + input.candidates.length + input.groups.length} lines for candidates in '${baseCode}'.`);

    const electionCode = this.codeBuilder.election(baseCode);

    const eCodes = new Map<number, Electorate>();
    input.electorates.forEach((row: AuActCsvElectorateHeader) => {
      const electorateName = titleCase(row.electorate);
      const electorateCode = this.codeBuilder.electorate(baseCode, electorateName);

      let ecodeNote = this.createNCodeNote(baseCode, row.ecode, 'ecode', electorateName);
      result.notes.push(ecodeNote);

      const electorate: Electorate = {
        assemblyCode: '',
        candidateCodes: [],
        code: electorateCode,
        description: '',
        electionCode: electionCode,
        noteCodes: [ecodeNote.code],
        title: electorateName,
      };
      result.electorates.push(electorate);
      eCodes.set(row.ecode, electorate);
    });

    const cCodes = new Map<number, Candidate>();
    input.candidates.forEach((row: AuActCsvCandidateHeader) => {
      const candidateName = row.cname.trim();
      const candidateNameSplit = candidateName.split(', ');
      const candidateLastName = titleCase(candidateNameSplit[0]);
      const candidateFirstName = titleCase(candidateNameSplit[1]);
      const candidateFullName = candidateLastName + ', ' + candidateFirstName;

      const candidateCode = this.codeBuilder.candidate(baseCode, candidateFullName, '');

      let ecodeNote = this.createNCodeNote(baseCode, row.ecode, 'ecode', candidateFullName);
      result.notes.push(ecodeNote);

      let pcodeNote = this.createNCodeNote(baseCode, row.pcode, 'pcode', candidateFullName);
      result.notes.push(pcodeNote);

      let ccodeNote = this.createNCodeNote(baseCode, row.ccode, 'ccode', candidateFullName);
      result.notes.push(ccodeNote);

      const candidate: Candidate = {
        assemblyCode: '',
        ballotEntryCode: '',
        code: candidateCode,
        description: '',
        electionCode: electionCode,
        electorateCode: eCodes.get(row.ecode)?.code ?? '',
        nameFirst: candidateFirstName,
        nameLast: candidateLastName,
        noteCodes: [ecodeNote.code, pcodeNote.code, ccodeNote.code],
        partyCode: '',
        title: candidateFullName
      };
      result.candidates.push(candidate);
      cCodes.set(row.ccode, candidate);
    });

    const pCodes = new Map<number, Party>();
    input.groups.forEach((row: AuActCsvGroupHeader) => {
      const partyName = titleCase(row.pname);
      const partyAbbrevName = row.pabbrev;
      const partyCode = this.codeBuilder.party(baseCode, partyName);

      let ecodeNote = this.createNCodeNote(baseCode, row.ecode, 'ecode', partyName);
      result.notes.push(ecodeNote);

      let pcodeNote = this.createNCodeNote(baseCode, row.pcode, 'pcode', partyName);
      result.notes.push(pcodeNote);

      const party: Party = {
        candidateCodes: [],
        code: partyCode,
        description: partyAbbrevName,
        electionCode: electionCode,
        noteCodes: [ecodeNote.code, pcodeNote.code],
        title: partyName
      };
      result.parties.push(party);
      pCodes.set(row.pcode, party);
    });

    // update candidates to set partyCode
    // update parties to set candidateCodes
    result.candidates.forEach(candidate => {
      const pcode = parseInt(result.notes.find(n => candidate.noteCodes.indexOf(n.code) > -1 && n.title == 'pcode')?.description ?? '');
      const party = pCodes.get(pcode);
      if (party) {
        candidate.partyCode = party.code;
        party.candidateCodes.push(candidate.code);
      }
    });

    const resultInfo = this.buildDataSetCounts(result);
    this.logger.info(`Finished '${electionCode}' with ${resultInfo}.`);

    return result;
  }

  write(baseDir: string, input: DataSet): void {
    throw new Error('Method not implemented.');
  }

  private createNCodeNote(baseCode: string, ncode: number, nname: string, parentTitle: string) {
    const nodeCode = this.codeBuilder.note(baseCode, nname, parentTitle);
    return {
      code: nodeCode,
      description: ncode.toString(10),
      noteType: 'internal',
      title: nname
    };
  }
}
