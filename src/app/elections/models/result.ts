import {NoteContract, NoteModel} from './note';

export interface ResultContract {
  value: number;
  category: string;
  code: string;
  title: string;

  ancestor_codes: string[];
  child_codes: string[];

  notes: NoteContract[];

  election_code: string;
  assembly_code: string;
  electorate_code: string;
  ballot_code: string;
}

export class ResultModel {

  /**
   * The identifier - code for participants (category is not null), title for blocks (category is null).
   */
  code: string;

  title: string;

  ancestor_codes: string[];
  child_codes: string[];

  notes: NoteModel[];

  election_code: string;
  assembly_code: string;
  electorate_code: string;
  ballot_code: string;

  /**
   * The number of votes.
   */
  value: number;

  /**
   * The category of this result.
   * one of:
   * for participants (e.g. candidate, party): 'elected', 'excluded', 'remaining'
   * for blocks (e.g. enrolled, formal): null
   */
  category: string;

  constructor(contract: ResultContract) {
    this.code = contract?.code;
    this.title = contract?.title;

    this.ancestor_codes = contract?.ancestor_codes;
    this.child_codes = contract?.child_codes;

    this.notes = contract?.notes;
    this.election_code = contract?.election_code;
    this.assembly_code = contract?.assembly_code;
    this.electorate_code = contract?.electorate_code;
    this.ballot_code = contract?.ballot_code;

    this.value = contract?.value;

    this.category = contract?.category;
  }
}
