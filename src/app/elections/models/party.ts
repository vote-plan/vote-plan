import {Note} from './note';
import {Candidate} from './candidate';

/**
 * A group of candidates in an election.
 * A party can cross election, assembly, and electorate boundaries.
 */
export interface Party {

  /**
   * The display name of the party.
   */
  title: string;

  /**
   * A description of the party.
   */
  description: string;

  /**
   * The party code.
   */
  code: string;

  /**
   * The party is running candidates in this election.
   */
  election: string;

  /**
   * The candidates in the party for the election.
   */
  candidates: Candidate[];


  /**
   * Additional information about the party.
   */
  notes: Note[];
}
