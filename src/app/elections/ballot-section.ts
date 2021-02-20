import {ElectionEntity} from './election-entity';

/**
 * A section on a ballot paper.
 */
export interface BallotSection extends ElectionEntity {

  /**
   * This ballot section contains these ballot entries.
   */
  ballotEntryCodes: string[];

  /**
   * This ballot section is part of the ballot paper for this assembly.
   */
  assemblyCode: string;
}
