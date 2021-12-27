/**
 * Additional information.
 */
export class Note {
  /**
   * The text to display for this note.
   */
  displayText: string;

  /**
   * The content / url / internal string for this note.
   */
  contentText: string;

  /**
   * The type of this note, helps determine how to render this note.
   */
  noteType: string;


  constructor(displayText: string, contentText: string, noteType: string) {
    this.displayText = displayText;
    this.contentText = contentText;
    this.noteType = noteType;
  }
}
