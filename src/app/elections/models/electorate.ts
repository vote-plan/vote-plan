import {Candidate} from './candidate';
import {Note} from './note';

/**
 * An electoral district, also known as an election district, legislative district, voting district, constituency,
 * riding, ward, division, (election) precinct, electoral area, circumscription, or electorate, is a territorial
 * subdivision for electing members to a legislative body.
 */
export interface Electorate {

  /**
   * The display name of the electorate.
   */
  title: string;

  /**
   * The electorate code.
   */
  code: string;

  /**
   * These are the candidates running in this electorate.
   */
  candidates: Candidate[];

  /**
   * Additional information.
   */
  notes: Note[];
}
