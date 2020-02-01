import {Candidate} from './candidate';
import {Election} from './election';
import {Note} from './note';

/**
 * A group of candidates in an election.
 * A party can cross election, assembly, and electorate boundaries.
 */
export class Party {

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
   * The candidates in the party for the election.
   */
  candidates: Candidate[];

  /**
   * The party is running candidates in this election.
   */
  election: Election;

  /**
   * Additional information about the party.
   */
  notes: Note[];
}
