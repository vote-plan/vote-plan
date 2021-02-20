import {ElectionEntity} from './election-entity';

/**
 * A chamber or house of a political institution.
 * Usually house of representatives or senate or similar.
 */
export interface Assembly extends ElectionEntity {

  /**
   * The sections of a ballot paper. Each section is a separate vote.
   * For example, an Australian Federal Election has one section for the Electorate.
   * For example, New Zealand National Elections have two sections -
   *    the Assembly (vote for one Party) and the Electorate (vote for one candidate).
   */
  ballotSectionCodes: string[];

  /**
   * The election that includes this assembly.
   */
  electionCode: string;

  /**
   * The electorates that contribute members to this assembly.
   */
  electorateCodes: string[];

  /**
   * Additional information for an assembly.
   */
  noteCodes: string[];
}
