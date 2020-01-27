import {Assembly} from './assembly';
import {Party} from './party';
import {Note} from './note';

export class Election {
  title: string;
  description: string;
  institution: string;
  locationAdministrativeAreaName: string;
  locationCountry: string;
  locationLocalityName: string;

  dateDay: number;
  dateMonth: number;
  dateYear: number;

  code: string;
  assemblies: Assembly[];
  parties: Party[];

  notes: Note[];
}
