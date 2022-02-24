/**
 * Additional information.
 */
export interface NoteContract {
  display: string;
  content: string;
  category: string;
}

export class NoteModel {
  /**
   * The text to display for this note.
   */
  display: string;

  /**
   * The content / url / internal string for this note.
   */
  content: string;

  /**
   * The type of this note, helps determine how to render this note.
   */
  category: string;

  constructor(contract: NoteContract) {
    this.display = contract?.display;
    this.content = contract?.content;
    this.category = contract?.category;
  }
}
