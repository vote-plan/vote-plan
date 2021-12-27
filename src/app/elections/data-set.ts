import {Candidate} from './candidate';
import {BallotEntry} from './ballot-entry';
import {Party} from './party';
import {Note} from './note';
import {BallotSection} from './ballot-section';
import {Election} from './election';
import {Electorate} from './electorate';
import {Assembly} from './assembly';

/**
 * A collection of election data.
 */
export interface DataSet {
  assemblies: Assembly[];
  ballotEntries: BallotEntry[];
  ballotSections: BallotSection[];
  candidates: Candidate[];
  elections: Election[];
  electorates: Electorate[];
  locations: Location[];
  notes: Note[];
  parties: Party[];
}
