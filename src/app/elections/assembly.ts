import {EntityIdentified} from './entity-identified';

/**
 * A chamber or house of a political institution.
 */
export class Assembly extends EntityIdentified {

  /**
   * The election that includes this assembly.
   */
  electionCode: string;

  /**
   * The electorates that contribute members to this assembly.
   */
  electorateCodes: string[];

  /**
   * The sections of a ballot. Each section is a separate vote.
   * For example, an Australian Federal Election has one section for the Electorate.
   * For example, New Zealand National Elections have two sections -
   *    the Assembly (cote for one Party) and the Electorate (vote for one candidate).
   */
  ballotSectionCodes: string[];


  constructor(code: string, title: string, description: string, electionCode: string) {
    super(code, title, description);

    this.electionCode = electionCode;
    this.ballotSectionCodes = new Array<string>();
    this.electorateCodes = new Array<string>();
    this.noteCodes = new Array<string>();
  }

  public addElectorate(code: string): void {
    this.electorateCodes.push(code);
  }

  public addBallotSection(code: string): void {
    this.ballotSectionCodes.push(code);
  }
}
