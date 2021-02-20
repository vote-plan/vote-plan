import {ElectionEntity} from './election-entity';

/**
 * One of the people running for a position in an assembly.
 */
export interface Candidate extends ElectionEntity {

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
   * This candidate is aiming to be elected to this assembly.
   */
  assemblyCode: string;

  /**
   * The candidate is on this ballot entry.
   */
  ballotEntryCode: string;

  /**
   * The candidate's party for this election.
   */
  partyCode: string;

  /**
   * This candidate is running in this election.
   */
  electionCode: string;

  /**
   * This candidate is running in this electorate.
   */
  electorateCode: string;

  /**
   * Additional information about the candidate.
   */
  noteCodes: string[];
}
