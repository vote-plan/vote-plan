import {NoteContract, NoteModel} from './note';

/**
 * One of the people running for a position in an assembly.
 */
export interface CandidateContract {
  code: string;
  title: string;
  nameFirst: string;
  nameLast: string;

  election_code: string;
  assembly_code: string;
  electorate_code: string;
  party_code: string;
  ballot_code: string;
  result_codes: string[];

  notes: NoteContract[];
}


export class CandidateModel {

  /**
   * The unique code.
   */
  code: string;

  title: string;

  /**
   * Candidate's first name as per name used to run in election.
   * (required, freetext)
   */
  nameFirst: string;

  /**
   * Candidate's last name as per name used to run in election.
   * (required, freetext)
   */
  nameLast: string;

  election_code: string;
  assembly_code: string;
  electorate_code: string;
  party_code: string;
  ballot_code: string;
  result_codes: string[];

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: CandidateContract) {
    this.code = contract?.code;
    this.title = contract?.title;
    this.nameFirst = contract?.nameFirst;
    this.nameLast = contract?.nameLast;

    this.election_code = contract?.election_code;
    this.assembly_code = contract?.assembly_code;
    this.electorate_code = contract?.electorate_code;
    this.party_code = contract?.party_code;
    this.ballot_code = contract?.ballot_code;
    this.result_codes = contract?.result_codes ?? [];

    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }

  getInfo(): NoteModel[] {
    return this.notes.filter(n => n.category == 'raw-info');
  }

  getIsIncumbent(): boolean {
    return !!this.notes.find(n => n.category == 'raw-info' && n.display == 'sitting' && n.content == 'yes');
  }

  getPartyLong(): string | undefined {
    const parties = this.getInfo().filter(i => i.display == 'party long').map(i => i.content).sort();
    if (parties.length > 0) {
      return parties[0];
    }
    return undefined;
  }

  getPartyShort(): string | undefined {
    return this.getInfo().find(i => i.display == 'party short')?.content;
  }

  getBallotPlace(): string | undefined {
    const info = this.getInfo().find(i => i.display == 'group' || i.display == 'position');
    return info ? `${info.display} ${info.content}` : undefined;
  }

  getOccupation(): string | undefined {
    const info = this.getInfo().find(i => i.display == 'occupation');
    return info?.content;
  }

  getStateShortName(): string | undefined {
    return this.notes.find(n => n.category == "raw-info" && n.display == "state short name")?.content;
  }
  getDivisionName(): string | undefined {
    return this.notes.find(n => n.category == "raw-info" && n.display == "division name")?.content;
  }
}
