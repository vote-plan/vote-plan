import { Note } from './note';

/**
 * A chamber or house of a political institution.
 */
export class Assembly {

  /**
   * The assembly title, usually house or representatives or senate or similar.
   * (required, freetext search)
   */
  title: string;

  /**
   * A description of the assembly.
   * (optional)
   */
  description: string;

  /**
   * The sections of a ballot. Each section is a separate vote.
   * For example, an Australian Federal Election has one section for the Electorate.
   * For example, New Zealand National Elections have two sections -
   *    the Assembly (cote for one Party) and the Electorate (vote for one candidate).
   */
  ballotSections: [];

  /**
   * The Assembly code.
   */
  code: string;

  /**
   * The election that includes this assembly.
   */
  election: string;

  /**
   * The electorates that contribute members to this assembly.
   */
  electorates: string[];

  /**
   * Additional information for an assembly.
   */
  notes: Note[];
}
