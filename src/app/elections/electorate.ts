import { Note } from './note';

/**
 * An electoral district, also known as an election district, legislative district, voting district, constituency,
 * riding, ward, division, (election) precinct, electoral area, circumscription, or electorate, is a territorial
 * subdivision for electing members to a legislative body.
 */
export class Electorate {

  /**
   * The display name of the electorate.
   */
  title: string;

  /**
   * A description of the electorate.
   */
  description: string;

  /**
   * The electorate code.
   */
  code: string;

  /**
   * This electorate electes members to this assembly.
   */
  assembly: string;

  /**
   * These are the candidates running in this electorate.
   */
  candidates: string[];

  /**
   * The electorate is part of this election.
   * Note that electorates can change between elections.
   */
  election: string;

  /**
   * Additional information about this electorate.
   */
  notes: Note[];


  constructor(title: string, description: string, code: string, assembly: string, election: string) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.assembly = assembly;
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
