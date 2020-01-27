import {Assembly} from './assembly';
import {Election} from './election';
import {Electorate} from './electorate';
import {Note} from './note';
import {Party} from './party';
import {BallotEntry} from './ballot-entry';

export class Candidate {
  nameFirst: string;
  nameLast: string;
  description: string;

  code: string;
  assembly: Assembly;
  ballotEntry: BallotEntry;
  party: Party;
  election: Election;
  electorate: Electorate;

  notes: Note[];
}
