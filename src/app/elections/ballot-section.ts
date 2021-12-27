/**
 * A section on a ballot paper.
 */
import {EntityIdentified} from './entity-identified';

export class BallotSection extends EntityIdentified {
  /**
   * This ballot section contains these ballot entries.
   */
  ballotEntryCodes: string[];

  /**
   * This ballot section is part of the ballot paper for this assembly.
   */
  assemblyCode: string;


  constructor(code: string, title: string, description: string, assemblyCode: string) {
    super(code, title, description);
    this.assemblyCode = assemblyCode;
    this.ballotEntryCodes = new Array<string>();
  }

  public addBallotEntry(code: string): void {
    this.ballotEntryCodes.push(code);
  }
}
