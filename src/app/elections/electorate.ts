import {Candidate} from './candidate';
import {Assembly} from './assembly';
import {Election} from './election';
import {Note} from './note';

export class Electorate {
  title: string;
  description: string;

  code: string;
  assembly: Assembly;
  candidates: Candidate[];
  election: Election;

  notes: Note[];
}
