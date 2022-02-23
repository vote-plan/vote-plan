import {Note} from './note';

/**
 * A section on a ballot paper.
 */
export interface BallotSection {
  /**
   * This ballot section contains these ballot entries.
   */
  ballotEntryCodes: string[];

  /**
   * This ballot section is part of the ballot paper for this assembly.
   */
  assemblyCode: string;

  /**
   * The sections of a ballot. Each section is a separate vote.
   * For example, an Australian Federal Election has one section for the Electorate.
   * For example, New Zealand National Elections have two sections -
   *    the Assembly (cote for one Party) and the Electorate (vote for one candidate).
   */

  /**
   * Additional information.
   */
  notes: Note[];

}
