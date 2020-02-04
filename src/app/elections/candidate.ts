import { Note } from './note';

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
  assembly: string;

  /**
   * The candidate is on this ballot entry.
   */
  ballotEntry: string;

  /**
   * The candidate's party for this election.
   */
  party: string;

  /**
   * This candidate is running in this election.
   */
  election: string;

  /**
   * This candidate is running in this electorate.
   */
  electorate: string;

  /**
   * Additional information about the candidate.
   */
  notes: Note[];
}
