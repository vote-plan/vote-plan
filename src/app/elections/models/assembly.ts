import {Electorate} from './electorate';
import {Note} from './note';

export interface AssemblyContract {
  code: string;
  title: string;
  electorates: any[] | null;
  notes: any[] | null;
}

/**
 * A chamber or house of a political institution.
 */
export class AssemblyModel {
  /**
   * The unique code.
   */
  code: string;

  /**
   * The displayed title.
   */
  title: string;

  /**
   * The electorates that contribute members to this assembly.
   */
  electorates: Electorate[];

  /**
   * Additional information.
   */
  notes: Note[];

  constructor(contract: AssemblyContract) {
    this.code = contract.code;
    this.title = contract.title;
    this.electorates = contract.electorates ?? [];
    this.notes = contract.notes ?? [];
  }
}
