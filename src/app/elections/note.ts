import {ElectionEntity} from './election-entity';

/**
 * Additional information.
 * title: The text to display for this note.
 * description: The content / url / internal string for this note.
 */
export interface Note extends ElectionEntity {

  /**
   * The type of this note, helps determine how to render this note.
   */
  noteType: string;
}
