import {Note} from './note';

/**
 * One of the people running for a position in an assembly.
 */
export interface Candidate {

  /**
   * The unique code.
   */
  code: string;

  /**
   * Candidate's honorific.
   */
  honorific: string;

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
   * Additional information.
   */
  notes: Note[];
}
