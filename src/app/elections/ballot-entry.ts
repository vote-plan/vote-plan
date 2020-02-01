import {Assembly} from './assembly';
import {Candidate} from './candidate';
import {Election} from './election';
import {Electorate} from './electorate';
import {Party} from './party';
import {Note} from './note';

/**
 * A single candidate's entry on a ballot form.
 */
export class BallotEntry {
  /**
   * The position on the ballot form.
   * Is usually a number, letter and number, or coordinate.
   * (required, freetext search)
   */
  position: number;

  /**
   * Display text for the ballot entry.
   */
  name: string;

  /**
   * The code for the ballot entry.
   */
  code: string;

  /**
   * The assembly candidates on this ballot are voted into.
   */
  assembly: Assembly;

  /**
   * The candidate on this ballot entry.
   */
  candidate: Candidate;

  /**
   * The election this ballot is part of.
   */
  election: Election;

  /**
   * The electorate of this ballot.
   */
  electorate: Electorate;

  /**
   * The party of the candidate on this ballot entry.
   */
  party: Party;

  /**
   * Additional information about this ballot entry.
   */
  notes: Note[];
}
