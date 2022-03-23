import {NoteContract, NoteModel} from './note';
import {DateTime} from 'luxon';


export interface ElectionContract {
  code: string;

  title: string;

  locationCountry: string;
  locationAdministrativeAreaName: string | undefined;
  locationLocalityName: string | undefined;
  locationDescription: string;

  date: string;
  dateTimeZone: string | undefined;

  assemblyCodes: string[];
  partyCodes: string[];

  notes: NoteContract[];
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
  locationAdministrativeAreaName: string | undefined;

  /**
   * Locality is the smallest subdivision.
   * Empty for national or administrative area elections.
   * It is usually a city or town or rural region.
   * (optional, freetext)
   */
  locationLocalityName: string | undefined;

  /**
   * A description of the political coverage of this election.
   * E.g. national, state, council
   */
  locationDescription: string;

  /**
   * The date of the election.
   * (required, freetext search)
   */
  date: string;

  /**
   * The timezone of the election.
   * (optional)
   */
  dateTimeZone: string | undefined;

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

    this.date = contract?.date;
    this.dateTimeZone = contract?.dateTimeZone;

    this.assemblyCodes = contract?.assemblyCodes ?? [];
    this.partyCodes = contract?.partyCodes ?? [];

    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }

  getDate(): DateTime {
    const dt = DateTime.fromISO(this.date);
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

  getInfo(): NoteModel[] {
    return this.notes.filter(n => n.category == "info-url")
  }
}

