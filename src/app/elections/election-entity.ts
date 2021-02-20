/**
 * A basic election entity.
 */
export interface ElectionEntity {
  /**
   * The display text.
   */
  title: string;

  /**
   * The unique code.
   */
  code: string;

  /**
   * The long-form description for display.
   */
  description: string;
}
