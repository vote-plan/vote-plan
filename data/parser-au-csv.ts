import {ParserBase} from './parser-base';
import {Parser} from './parser';
import {DataSet} from '../src/app/elections/data-set';
import {CodeBuilder} from './code-builder';
import {factory} from './logging';
import {Note} from '../src/app/elections/note';
import {Party} from '../src/app/elections/party';
import {Candidate} from '../src/app/elections/candidate';
import {titleCase} from './extensions';
import {Electorate} from '../src/app/elections/electorate';

export interface AuCsvHeader {
  txn_nm: string
  nom_ty: string
  state_ab: string
  div_nm: string
  ticket: string
  ballot_position: string
  surname: string
  ballot_given_nm: string
  party_ballot_nm: string
  occupation: string
  address_1: string
  address_2: string
  postcode: string
  suburb: string
  address_state_ab: string
  contact_work_ph: string
  contact_home_ph: string
  postal_address_1: string
  postal_address_2: string
  postal_suburb: string
  postal_postcode: string
  contact_fax: string
  postal_state_ab: string
  contact_mobile_no: string
  contact_email: string
}

export class ParserAuCsv extends ParserBase implements Parser {
  private readonly codeBuilder: CodeBuilder;
  private readonly logger = factory.getLogger('ParserAuCsv');

  constructor(codeBuilder: CodeBuilder) {
    super();
    this.codeBuilder = codeBuilder;
  }

  parse(baseCode: string, input: any): DataSet {
    // input is an array of arrays

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

    input.forEach((row: AuCsvHeader) => {

      // TODO
      // txn_nm = "2016 Federal Election"
      // nom_ty = "H"
      // state_ab = "ACT"
      // ticket = ""
      // ballot_position = "1"

      const electorateName = titleCase(row.div_nm);
      const electorateCode = this.codeBuilder.electorate(baseCode, electorateName);

      const partyName = row.party_ballot_nm ? titleCase(row.party_ballot_nm) : this.codeBuilder.defaultPartyName();
      const partyCode = this.codeBuilder.party(baseCode, partyName);

      const candidateLastName = titleCase(row.surname);
      const candidateFirstName = titleCase(row.ballot_given_nm);
      const candidateFullName = candidateLastName + ', ' + candidateFirstName;
      const candidateCode = this.codeBuilder.candidate(baseCode, candidateFullName, partyName);

      const electorate: Electorate = {
        assemblyCode: '',
        candidateCodes: [],
        code: electorateCode,
        description: '',
        electionCode: electionCode,
        noteCodes: [],
        title: electorateName,
      };
      result.electorates.push(electorate);

      const party: Party = {
        candidateCodes: [],
        code: partyCode,
        description: '',
        electionCode: electionCode,
        noteCodes: [],
        title: partyName,
      };
      result.parties.push(party);

      const candidate: Candidate = {
        assemblyCode: '',
        ballotEntryCode: '',
        code: candidateCode,
        description: '',
        electionCode: electionCode,
        electorateCode: electorateCode,
        nameFirst: candidateFirstName,
        nameLast: candidateLastName,
        noteCodes: [],
        partyCode: partyCode,
        title: candidateFullName,
      };
      result.candidates.push(candidate);
      party.candidateCodes.push(candidateCode);
      electorate.candidateCodes.push(candidateCode);

      const parentTitle = candidateFullName;

      // office address
      const officeRaw = [
        row.address_1,
        row.address_2,
        row.suburb,
        row.postcode,
        row.address_state_ab,
      ];
      const officeNote = this.buildNote(baseCode, 'Office Address', officeRaw, parentTitle);
      if (officeNote) {
        result.notes.push(officeNote);
        candidate.noteCodes.push(officeNote.code);
      }

      // postal address
      const postalRaw = [
        row.postal_address_1,
        row.postal_address_2,
        row.postal_suburb,
        row.postal_postcode,
        row.postal_state_ab,
      ];
      const postalNote = this.buildNote(baseCode, 'Postal Address', postalRaw, parentTitle);
      if (postalNote) {
        result.notes.push(postalNote);
        candidate.noteCodes.push(postalNote.code);
      }

      // work phone
      const workPhoneRaw = [row.contact_work_ph];
      const workPhoneNote = this.buildNote(baseCode, 'Work Phone', workPhoneRaw, parentTitle);
      if (workPhoneNote) {
        result.notes.push(workPhoneNote);
        candidate.noteCodes.push(workPhoneNote.code);
      }

      // home phone
      const homePhoneRaw = [row.contact_home_ph];
      const homePhoneNote = this.buildNote(baseCode, 'Home Phone', homePhoneRaw, parentTitle);
      if (homePhoneNote) {
        result.notes.push(homePhoneNote);
        candidate.noteCodes.push(homePhoneNote.code);
      }

      // fax
      const faxRaw = [row.contact_fax];
      const faxNote = this.buildNote(baseCode, 'Fax', faxRaw, parentTitle);
      if (faxNote) {
        result.notes.push(faxNote);
        candidate.noteCodes.push(faxNote.code);
      }

      // mobile phone
      const mobilePhoneRaw = [row.contact_mobile_no];
      const mobilePhoneNote = this.buildNote(baseCode, 'Mobile Phone', mobilePhoneRaw, parentTitle);
      if (mobilePhoneNote) {
        result.notes.push(mobilePhoneNote);
        candidate.noteCodes.push(mobilePhoneNote.code);
      }

      // email
      const emailRaw = [row.contact_email];
      const emailNote = this.buildNote(baseCode, 'Email', emailRaw, parentTitle);
      if (emailNote) {
        result.notes.push(emailNote);
        candidate.noteCodes.push(emailNote.code);
      }

      // occupation
      const occupationRaw = [row.occupation];
      const occupationNote = this.buildNote(baseCode, 'Occupation', occupationRaw, parentTitle);
      if (occupationNote) {
        result.notes.push(occupationNote);
        candidate.noteCodes.push(occupationNote.code);
      }

    });

    const resultInfo = this.buildDataSetCounts(result);
    this.logger.info(`Finished '${electionCode}' with ${resultInfo}.`);

    return result;
  }

  write(baseDir: string, input: DataSet): void {
    throw new Error('Method not implemented.');
  }

  private buildNote(baseCode: string, title: string, content: string[], parentTitle: string): Note | null {
    const desc = content.filter(i => i?.trim()).join(', ');
    if (desc) {
      return {
        code: this.codeBuilder.note(baseCode, title, parentTitle),
        description: desc,
        noteType: 'content',
        title: title,
      };
    }
    return null;
  }

}
