export interface ResultContract {
  name: string;
  votes: number;
  status: string;
  category: string;
}

export class ResultModel {
  /**
   * The identifier - code for participants (category is not null), title for blocks (category is null).
   */
  name: string;

  /**
   * The number of votes.
   */
  votes: number;

  /**
   * The category of this result.
   * one of:
   * for participants (e.g. candidate, party): 'elected', 'excluded', 'remaining'
   * for blocks (e.g. enrolled, formal): null
   */
  category: string;

  constructor(contract: ResultContract) {
    this.name = contract?.name;
    this.votes = contract?.votes;
    this.category = contract?.category;
  }
}
