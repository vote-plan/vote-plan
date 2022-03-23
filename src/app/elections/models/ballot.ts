import {NoteContract, NoteModel} from './note';

export interface BallotContract {
  code: string;
  category: string;
  groupCandidatesByParty: boolean;
  orderMethod: string;

  electionCode: string;
  assemblyCode: string;
  electorateCode: string;

  partyCodes: string[];
  candidateCodes: string[];
  resultCodes: string[];

  notes: NoteContract[];
}

/**
 * The definition for a ballot paper used in an election.
 */
export class BallotModel {

  code: string;

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

  electionCode: string;
  assemblyCode: string;
  electorateCode: string;

  /**
   * The party codes on this ballot.
   * They might be in order depending on orderMethod.
   */
  partyCodes: string[];

  /**
   * The candidate codes on this ballot.
   * They might be in order depending on orderMethod.
   */
  candidateCodes: string[];

  /**
   * The ballot results.
   */
  resultCodes: string[];

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: BallotContract) {
    this.code = contract?.code;
    this.category = contract?.category;
    this.groupCandidatesByParty = contract?.groupCandidatesByParty;
    this.orderMethod = contract?.orderMethod;

    this.electionCode = contract?.electionCode;
    this.assemblyCode = contract?.assemblyCode;
    this.electorateCode = contract?.electorateCode;

    this.partyCodes = contract?.partyCodes;
    this.candidateCodes = contract?.candidateCodes;
    this.resultCodes = contract?.resultCodes ?? [];

    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }
}
