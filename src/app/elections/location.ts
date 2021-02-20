import {ElectionEntity} from './election-entity';

/**
 * The location of an election.
 */
export interface Location extends ElectionEntity {

  /**
   * The Administrative Division level 1 display text.
   * The broadest subdivision.
   * It is usually the name of the Country or Nation or Sovereign state.
   * (required, freetext)
   */
  administrativeDivision1Title: string;

  /**
   * The Administrative Division level 1 unique code.
   */
  administrativeDivision1Code: string;

  /**
   * The Administrative Division level 2 display text.
   * The middle subdivision.
   * It is usually a State or Province or Prefecture or Territory or District.
   * (optional, freetext)
   */
  administrativeDivision2Title: string;

  /**
   * The Administrative Division level 2 unique code.
   */
  administrativeDivision2Code: string;

  /**
   * The Administrative Division level 3 display text.
   * The smallest subdivision.
   * It is usually a County or Council or City or Shire or Town or Rural region or
   * Municipality or Locality or Populated place or Local government.
   * (optional, freetext)
   */
  administrativeDivision3Title: string;

  /**
   * The Administrative Division level 3 unique code.
   */
  administrativeDivision3Code: string;
}
