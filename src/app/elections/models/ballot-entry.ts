import {Note} from './note';

/**
 * A single candidate's entry on a ballot form.
 */
export interface BallotEntry {
  /**
   * The position on the ballot form.
   * Is usually a number, letter and number, or coordinate.
   * (required, freetext search)
   */
  position: number;

  /**
   * The assembly candidates on this ballot are voted into.
   */
  assemblyCode: string;

  /**
   * The candidate on this ballot entry.
   */
  candidateCode: string;

  /**
   * The election this ballot is part of.
   */
  electionCode: string;

  /**
   * The electorate of this ballot.
   */
  electorateCode: string;

  /**
   * The party of the candidate on this ballot entry.
   */
  partyCode: string;

  /**
   * Additional information.
   */
  notes: Note[];
}
