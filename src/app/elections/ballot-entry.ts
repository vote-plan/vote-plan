import {EntityIdentified} from './entity-identified';

/**
 * A single candidate's entry on a ballot form.
 */
export class BallotEntry extends EntityIdentified {
  /**
   * The position on the ballot form.
   * Is usually a number, letter and number, or coordinate.
   * (required, freetext search)
   */
  position: number;

  /**
   * The assembly candidates on this ballot are voted into.
   */
  assemblyCode: string;

  /**
   * The candidate on this ballot entry.
   */
  candidateCode: string;

  /**
   * The election this ballot is part of.
   */
  electionCode: string;

  /**
   * The electorate of this ballot.
   */
  electorateCode: string;

  /**
   * The party of the candidate on this ballot entry.
   */
  partyCode: string;

  constructor(code: string, title: string, description: string,
              position: number, assemblyCode: string, candidateCode: string,
              electionCode: string, electorateCode: string, partyCode: string) {
    super(code, title, description);

    this.position = position;

    this.assemblyCode = assemblyCode;
    this.candidateCode = candidateCode;
    this.electionCode = electionCode;
    this.electorateCode = electorateCode;
    this.partyCode = partyCode;
  }
}
