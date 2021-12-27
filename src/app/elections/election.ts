import {EntityIdentified} from './entity-identified';

/**
 * An event held to elect one person for each seat in each assembly.
 */
export class Election extends EntityIdentified {

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
   * The coverage of this election.
   */
  coverageType: string;

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
  assemblies: string[];

  /**
   * The parties putting forward candidates in this election.
   * Includes independent candidates in a catch-all party.
   */
  parties: string[];


  constructor(code: string, title: string, description: string, institution: string, locationCountry: string,
              locationAdministrativeAreaName: string, locationLocalityName: string, coverageType: string,
              dateYear: number, dateMonth: number, dateDay: number) {
    super(code, title, description);

    this.title = title;
    this.description = description;
    this.institution = institution;
    this.locationCountry = locationCountry;
    this.locationAdministrativeAreaName = locationAdministrativeAreaName;
    this.locationLocalityName = locationLocalityName;
    this.coverageType = coverageType;
    this.dateYear = dateYear;
    this.dateMonth = dateMonth;
    this.dateDay = dateDay;
    this.code = code;

    this.assemblies = new Array<string>();
    this.parties = new Array<string>();
  }

  public addAssembly(value: string): void {
    this.assemblies.push(value);
  }

  public addParty(value: string): void {
    this.parties.push(value);
  }
}

