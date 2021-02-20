import {ElectionEntity} from './election-entity';

/**
 * A group of candidates in an election.
 * A party can cross election, assembly, and electorate boundaries.
 */
export interface Party extends ElectionEntity {

  /**
   * The candidates in the party for the election.
   */
  candidateCodes: string[];

  /**
   * The party is running candidates in this election.
   */
  electionCode: string;

  /**
   * Additional information about the party.
   */
  noteCodes: string[];
}
