import {Assembly} from './assembly';
import {Party} from './party';
import {Note} from './note';

/**
 * An event held to electe one person for each seat in each assembly.
 */
export class Election {
  /**
   * Display string for the election.
   * (required, freetext)
   */
  title: string;

  /**
   * A summary of the election.
   * (optional)
   */
  description: string;

  /**
   * Institution is usually a parliament or Congress or local government.
   * (optional, freetext)
   */
  institution: string;

  /**
   * Country is the broadest subdivision.
   * It is usually the name of the country or nation.
   * (required, freetext)
   */
  locationCountry: string;

  /**
   * Administrative area is the middle subdivision.
   * Empty for national elections.
   * It is usually a State or Province or County or Council.
   * (optional, freetext)
   */
  locationAdministrativeAreaName: string;

  /**
   * Locality is the smallest subdivision.
   * Empty for national or administrative area elections.
   * It is usually a city or town or rural region.
   * (optional, freetext)
   */
  locationLocalityName: string;

  /**
   * The year of the election.
   * (required, freetext search)
   */
  dateYear: number;

  /**
   * The month of the election.
   * From 1.
   * (optional)
   */
  dateMonth: number;

  /**
   * The day of the election.
   * From 1.
   * (optional)
   */
  dateDay: number;

  /**
   * The election code.
   */
  code: string;

  /**
   * The assemblies that are part of this election.
   */
  assemblies: Assembly[];

  /**
   * The parties putting forward candidates in this election.
   * Includes independent candidates in a catch-all party.
   */
  parties: Party[];

  /**
   * Additional information about the election.
   */
  notes: Note[];
}
