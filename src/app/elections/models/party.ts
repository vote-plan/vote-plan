import {NoteContract, NoteModel} from './note';
import {CandidateContract, CandidateModel} from './candidate';


export interface PartyContract {
  code: string;
  title: string;
  candidates: CandidateContract[];
  category: string;
  notes: NoteContract[];
}

/**
 * A group of candidates in an election.
 * A party can cross election, assembly, and electorate boundaries.
 */
export class PartyModel {
  /**
   * The party code.
   */
  code: string;

  /**
   * The display name of the party.
   */
  title: string;

  /**
   * The candidates in the party for the election.
   */
  candidates: CandidateModel[];

  /**
   * The type of party group.
   * Options are:
   * - 'named' - a named party with endorsed candidates
   * - 'unnamed' - a group of candidates not part of a party, but with a party vote box
   * - 'ungrouped' - a set of candidates not part of a party and with no party vote box
   */
  category: string;

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: PartyContract) {
    this.code = contract?.code;
    this.title = contract?.title;
    this.candidates = contract?.candidates?.map(i => new CandidateModel(i)) ?? [];
    this.category = contract?.category;
    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }
}
