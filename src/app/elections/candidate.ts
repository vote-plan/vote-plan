import {Assembly} from './assembly';
import {Election} from './election';
import {Electorate} from './electorate';
import {Note} from './note';
import {Party} from './party';
import {BallotEntry} from './ballot-entry';

/**
 * One of the people running for a position in an assembly.
 */
export class Candidate {
  /**
   * Candidate's first name as per name used to run in election.
   * (required, freetext)
   */
  nameFirst: string;

  /**
   * Candidate's last name as per name used to run in election.
   * (required, freetext)
   */
  nameLast: string;

  /**
   * Description of candidate.
   * (optional)
   */
  description: string;

  /**
   * Candidate code.
   */
  code: string;

  /**
   * This candidate is aiming to be elected to this assembly.
   */
  assembly: Assembly;

  /**
   * The candidate is on this ballot entry.
   */
  ballotEntry: BallotEntry;

  /**
   * The candidate's party for this election.
   */
  party: Party;

  /**
   * This candidate is running in this election.
   */
  election: Election;

  /**
   * This candidate is running in this electorate.
   */
  electorate: Electorate;

  /**
   * Additional information about the candidate.
   */
  notes: Note[];
}
