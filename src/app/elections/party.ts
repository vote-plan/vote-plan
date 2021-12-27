import {Note} from './note';

/**
 * A group of candidates in an election.
 * A party can cross election, assembly, and electorate boundaries.
 */
export class Party {

  /**
   * The display name of the party.
   */
  title: string;

  /**
   * A description of the party.
   */
  description: string;

  /**
   * The party code.
   */
  code: string;

  /**
   * The party is running candidates in this election.
   */
  election: string;

  /**
   * The candidates in the party for the election.
   */
  candidates: string[];


  /**
   * Additional information about the party.
   */
  notes: Note[];


  constructor(title: string, description: string, code: string, election: string) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.election = election;

    this.candidates = new Array<string>();
    this.notes = new Array<Note>();
  }

  public addNote(value: Note): void {
    this.notes.push(value);
  }

  public addCandidate(value: string): void {
    this.candidates.push(value);
  }
}
