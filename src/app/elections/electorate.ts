import {ElectionEntity} from './election-entity';

/**
 * An electoral district, also known as
 * election district, legislative district, voting district, constituency,
 * riding, ward, division, (election) precinct, electoral area, circumscription, or electorate.
 * This is a territorial subdivision for electing members to a legislative body.
 */
export interface Electorate extends ElectionEntity {

  /**
   * This electorate elects members to this assembly.
   */
  assemblyCode: string;

  /**
   * These are the candidates running in this electorate.
   */
  candidateCodes: string[];

  /**
   * The electorate is part of this election.
   * Note that electorates can change between elections.
   */
  electionCode: string;

  /**
   * Additional information about this electorate.
   */
  noteCodes: string[];
}
