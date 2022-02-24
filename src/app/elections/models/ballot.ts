import {NoteContract, NoteModel} from './note';
import {ResultContract, ResultModel} from './result';

export interface BallotContract {
  category: string;
  groupCandidatesByParty: boolean;
  orderMethod: string;
  orderPartyCodes: string[];
  orderCandidateCodes: string[];
  results: ResultContract[];
  notes: NoteContract[];
}

/**
 * The definition for a ballot paper used in an election.
 */
export class BallotModel {

  /**
   * The category of ballot.
   * one of: 'party' or 'candidate'
   */
  category: string;

  /**
   * Whether to group candidates by party.
   * only relevant when showing candidates.
   */
  groupCandidatesByParty: boolean;

  /**
   * The ordering method.
   * one of: 'fixed', 'robson-rotation'
   * this specifies if the order of the items in orderCodes matters or not
   */
  orderMethod: string;

  // ballots that show candidates grouped by party need two sets of orderings: party and candidate

  /**
   * The party codes on this ballot.
   * They might be in order depending on orderMethod.
   */
  partyCodes: string[];

  /**
   * The candidate codes on this ballot.
   * They might be in order depending on orderMethod.
   */
  CandidateCodes: string[];

  /**
   * The ballot results.
   */
  results: ResultModel[]

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: BallotContract) {
    this.category = contract?.category;
    this.groupCandidatesByParty = contract?.groupCandidatesByParty;
    this.orderMethod = contract?.orderMethod;
    this.partyCodes = contract?.orderPartyCodes;
    this.CandidateCodes = contract?.orderCandidateCodes;
    this.results = contract?.results?.map(i => new ResultModel(i)) ?? [];
    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }
}
