/**
 * A basic entity with identifier and displayed details and notes.
 */
export abstract class EntityIdentified {
  /**
   * The displayed title.
   */
  title: string;

  /**
   * The unique code.
   */
  code: string;

  /**
   * The long-form text description.
   */
  description: string;

  /**
   * Additional information.
   */
  noteCodes: string[];

  protected constructor(code: string, title: string, description: string) {
    this.code = code;
    this.title = title;
    this.description = description;
    this.noteCodes = new Array<string>();
  }

  public addNote(code: string): void {
    this.noteCodes.push(code);
  }
}
