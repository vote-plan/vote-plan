import {AssemblyContract, AssemblyModel} from './assembly';
import {PartyContract, PartyModel} from './party';
import {NoteContract, NoteModel} from './note';
import {DateTime} from 'luxon';


export interface ElectionContract {
  code: string;

  title: string;

  locationCountry: string;
  locationAdministrativeAreaName: string | null;
  locationLocalityName: string | null;
  locationDescription: string;

  dateYear: number;
  dateMonth: number | null;
  dateDay: number | null;
  dateTimeZone: string | null;

  assemblies: AssemblyContract[];
  parties: PartyContract[] | null;
  notes: NoteContract[] | null;
}

/**
 * An event held to elect one person for each seat in each assembly.
 */
export class ElectionModel {
  /**
   * The unique code.
   */
  code: string;

  /**
   * Institution is usually a parliament or Congress or local government.
   * (optional, freetext)
   */
  title: string;

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
  locationAdministrativeAreaName: string | null;

  /**
   * Locality is the smallest subdivision.
   * Empty for national or administrative area elections.
   * It is usually a city or town or rural region.
   * (optional, freetext)
   */
  locationLocalityName: string | null;

  /**
   * A description of the political coverage of this election.
   * E.g. national, state, council
   */
  locationDescription: string;

  /**
   * The year of the election.
   * (required, freetext search)
   */
  dateYear: number;

  /**
   * The month of the election.
   * From 1.
   */
  dateMonth: number | null;

  /**
   * The day of the election.
   * From 1.
   */
  dateDay: number | null;

  /**
   * The timezone of the election.
   * (optional)
   */
  dateTimeZone: string | null;

  /**
   * The assemblies that are part of this election.
   */
  assemblies: AssemblyModel[];

  /**
   * The parties putting forward candidates in this election.
   * Includes independent candidates in a catch-all party.
   */
  parties: PartyModel[];

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: ElectionContract) {
    this.code = contract?.code;

    this.title = contract?.title;

    this.locationCountry = contract?.locationCountry;
    this.locationAdministrativeAreaName = contract?.locationAdministrativeAreaName;
    this.locationLocalityName = contract?.locationLocalityName;
    this.locationDescription = contract?.locationDescription;

    this.dateYear = contract?.dateYear;
    this.dateMonth = contract?.dateMonth;
    this.dateDay = contract?.dateDay;
    this.dateTimeZone = contract?.dateTimeZone;

    this.assemblies = contract?.assemblies?.map(i => new AssemblyModel(i)) ?? [];
    this.parties = contract?.parties?.map(i => new PartyModel(i)) ?? [];
    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }

  getDate(): DateTime {
    const dt = DateTime.local(this.dateYear, this.dateMonth ?? 1, this.dateDay ?? 1);
    if (this.dateTimeZone) {
      return dt.setZone(this.dateTimeZone);
    }
    return dt;
  }

  getLongDate(): string {
    return this.getDate().toLocaleString(DateTime.DATE_HUGE);
  }

  getDisplayDiffFromNow(): string {
    return this.getDate().toRelativeCalendar() ?? '';
  }
}

