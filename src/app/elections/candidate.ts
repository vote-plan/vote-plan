import {Note} from './note';
import {EntityIdentified} from './entity-identified';

/**
 * One of the people running for a position in an assembly.
 */
export class Candidate extends EntityIdentified {
  /**
   * Candidate's first name as per name used to run in election.
   * (required, freetext)
   */
  nameFirst: string;

  /**
   * Candidate's last name as per name used to run in election.
   * (required, freetext)
   */
  nameLast: string;

  /**
   * This candidate is aiming to be elected to this assembly.
   */
  assembly: string;

  /**
   * The candidate is on this ballot entry.
   */
  ballotEntry: string;

  /**
   * The candidate's party for this election.
   */
  party: string;

  /**
   * This candidate is running in this election.
   */
  election: string;

  /**
   * This candidate is running in this electorate.
   */
  electorate: string;

  /**
   * Additional information about the candidate.
   */
  notes: Note[];


  constructor(code: string, title: string, description: string,
              nameFirst: string, nameLast: string,
              assembly: string, ballotEntry: string, party: string, election: string, electorate: string) {
    super(code, title, description);

    this.nameFirst = nameFirst;
    this.nameLast = nameLast;
    this.description = description;
    this.code = code;
    this.assembly = assembly;
    this.ballotEntry = ballotEntry;
    this.party = party;
    this.election = election;
    this.electorate = electorate;
    this.notes = new Array<Note>();
  }
}
