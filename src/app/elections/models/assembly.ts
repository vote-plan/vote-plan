import {ElectorateContract, ElectorateModel} from './electorate';
import {NoteContract, NoteModel} from './note';
import {BallotContract, BallotModel} from './ballot';

export interface AssemblyContract {
  code: string;
  title: string;
  electorates: ElectorateContract[] | null;
  ballots: BallotContract[] | null;
  notes: NoteContract[] | null;
}

/**
 * A chamber or house of a political institution.
 */
export class AssemblyModel {
  /**
   * The unique code.
   */
  code: string;

  /**
   * The displayed title.
   */
  title: string;

  /**
   * The electorates that contribute members to this assembly.
   */
  electorates: ElectorateModel[];

  /**
   * The sections of a ballot or separate ballot papers.
   * Each section might be a separate vote or it might be an option to choose to make one vote.
   * For example, an Australian Federal Election has one section for the Electorate.
   * For example, New Zealand National Elections have two sections -
   *    the Assembly (cote for one Party) and the Electorate (vote for one candidate).
   */
  ballots: BallotModel[];

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: AssemblyContract) {
    this.code = contract?.code;
    this.title = contract?.title;
    this.electorates = contract?.electorates?.map(i => new ElectorateModel(i)) ?? [];
    this.ballots = contract?.ballots?.map(i => new BallotModel(i)) ?? [];
    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }
}
