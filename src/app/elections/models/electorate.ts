import {CandidateContract, CandidateModel} from './candidate';
import {NoteContract, NoteModel} from './note';
import {BallotContract, BallotModel} from './ballot';


export interface ElectorateContract {
  code: string;
  title: string;
  candidates: CandidateContract[] | null;
  ballots: BallotContract[] | null;
  notes: NoteContract[] | null;
}

/**
 * An electoral district, also known as an election district, legislative district, voting district, constituency,
 * riding, ward, division, (election) precinct, electoral area, circumscription, or electorate, is a territorial
 * subdivision for electing members to a legislative body.
 */
export class ElectorateModel {

  /**
   * The electorate code.
   */
  code: string;

  /**
   * The display name of the electorate.
   */
  title: string;

  /**
   * These are the candidates running in this electorate.
   */
  candidates: CandidateModel[];

  ballots: BallotModel[];

  /**
   * Additional information.
   */
  notes: NoteModel[];

  constructor(contract: ElectorateContract) {
    this.code = contract?.code;
    this.title = contract?.title;
    this.candidates = contract?.candidates?.map(i => new CandidateModel(i)) ?? [];
    this.ballots = contract?.ballots?.map(i => new BallotModel(i)) ?? [];
    this.notes = contract?.notes?.map(i => new NoteModel(i)) ?? [];
  }
}
