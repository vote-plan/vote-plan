import {Candidate} from './candidate';
import {Election} from './election';
import {Note} from './note';

export class Party {
  title: string;
  description: string;

  code: string;
  candidates: Candidate[];
  election: Election;

  notes: Note[];
}
