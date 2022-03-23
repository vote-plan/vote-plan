import {NoteContract, NoteModel} from './note';

export interface AssemblyContract {
  code: string;
  title: string;
  electionCode: string;
  electorateCodes: string[];
  ballotCodes: string[];
  notes: NoteContract[] | undefined;
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
   * Election code.
   */
  electionCode: string;

  /**
   * The electorates that contribute members to this assembly.
   */
  electorateCodes: string[];

  /**
   * The sections of a ballot or separate ballot papers.
   * Each section might be a separate vote or it might be an option to choose to make one vote.
   * For example, an Australian Federal Election has one section for the Electorate.
   * For example, New Zealand National Elections have two sections -
   *    the Assembly (cote for one Party) and the Electorate (vote for one candidate).
   */
  ballotCodes: string[];

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: AssemblyContract) {
    this.code = contract?.code;
    this.title = contract?.title;
    this.electionCode = contract?.electionCode;
    this.electorateCodes = contract?.electorateCodes ?? [];
    this.ballotCodes = contract?.ballotCodes ?? [];
    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }

  getElectorateCount(): number {
    return this.electorateCodes.length;
  }
}
