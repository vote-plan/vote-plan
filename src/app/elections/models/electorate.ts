import {NoteContract, NoteModel} from './note';


export interface ElectorateContract {
  code: string;
  title: string;

  candidate_codes: string[];
  ballot_codes: string[];

  election_code: string;
  assembly_code: string;

  notes: NoteContract[] | undefined;
}

/**
 * An electoral district, also known as an election district, legislative district, voting district, constituency,
 * riding, ward, division, (election) precinct, electoral area, circumscription, or electorate, is a territorial
 * subdivision for electing members to a legislative body.
 */
export class ElectorateModel {

  /**
   * The electorate code.
   */
  code: string;

  /**
   * The display name of the electorate.
   */
  title: string;

  /**
   * These are the candidates running in this electorate.
   */
  candidate_codes: string[];

  ballot_codes: string[];

  election_code: string;
  assembly_code: string;

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: ElectorateContract) {
    this.code = contract?.code;
    this.title = contract?.title;
    this.candidate_codes = contract?.candidate_codes ?? [];
    this.ballot_codes = contract?.ballot_codes ?? [];
    this.election_code = contract?.election_code;
    this.assembly_code = contract?.assembly_code;
    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }

  getCandidateCount(): number {
    return this.candidate_codes.length;
  }

  getStateShortName(): string | undefined {
    return this.notes.find(n => n.category == "raw-info" && n.display == "state short name")?.content;
  }
}
