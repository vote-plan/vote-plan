import { Note } from './note';
import { Election } from './election';
import { Electorate } from './electorate';

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
