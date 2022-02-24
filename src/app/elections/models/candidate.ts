import {NoteContract, NoteModel} from './note';
import {PartyContract, PartyModel} from './party';

/**
 * One of the people running for a position in an assembly.
 */
export interface CandidateContract {
  code: string;
  honorific: string;
  nameFirst: string;
  nameLast: string;
  party: PartyContract;
  notes: NoteContract[];
}


export class CandidateModel {

  /**
   * The unique code.
   */
  code: string;

  /**
   * Candidate's honorific.
   */
  honorific: string;

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

  party: PartyModel;

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: CandidateContract) {
    this.code = contract?.code;
    this.honorific = contract?.honorific;
    this.nameFirst = contract?.nameFirst;
    this.nameLast = contract?.nameLast;
    this.party = new PartyModel(contract?.party);
    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }
}
