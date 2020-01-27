import {Note} from './note';
import {Election} from './election';
import {Electorate} from './electorate';

export class Assembly {
  title: string;
  description: string;

  code: string;
  election: Election;
  electorates: Electorate[];

  notes: Note[];
}
