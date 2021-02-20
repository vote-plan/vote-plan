import {ElectionEntity} from './election-entity';

/**
 * An event held to elect one person for each seat in each assembly.
 */
export interface Election extends ElectionEntity {

  /**
   * Institution is usually a parliament or Congress or local government.
   * (optional, freetext)
   */
  institution: string;

  /**
   * The coverage of this election.
   */
  coverageType: string;

  /**
   * The date of the election.
   * (required, freetext search)
   */
  held: string;

  /**
   * The location of the election.
   */
  locationCode: string;

  /**
   * The assemblies that are part of this election.
   */
  assemblyCodes: string[];

  /**
   * The parties putting forward candidates in this election.
   * Includes independent candidates in a catch-all party.
   */
  partyCodes: string[];

  /**
   * Additional information about the election.
   */
  noteCodes: string[];
}
