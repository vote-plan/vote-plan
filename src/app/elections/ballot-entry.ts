import {Assembly} from './assembly';
import {Candidate} from './candidate';
import {Election} from './election';
import {Electorate} from './electorate';
import {Party} from './party';
import {Note} from './note';

export class BallotEntry {
  title: string;
  position: number;

  code: string;
  assembly: Assembly;
  candidate: Candidate;
  election: Election;
  electorate: Electorate;
  party: Party;

  notes: Note[];
}
