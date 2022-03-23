import {AssemblyContract, AssemblyModel} from './assembly';
import {BallotContract, BallotModel} from './ballot';
import {CandidateContract, CandidateModel} from './candidate';
import {ElectionContract, ElectionModel} from './election';
import {ElectorateContract, ElectorateModel} from './electorate';
import {PartyContract, PartyModel} from './party';
import {ResultContract, ResultModel} from './result';


export interface CombinationContract {
  assemblies: AssemblyContract[];
  ballots: BallotContract[];
  candidates: CandidateContract[];
  elections: ElectionContract[];
  electorates: ElectorateContract[];
  parties: PartyContract[];
  results: ResultContract[];
}


export class CombinationModel {
  assemblies: AssemblyModel[];
  ballots: BallotModel[];
  candidates: CandidateModel[];
  elections: ElectionModel[];
  electorates: ElectorateModel[];
  parties: PartyModel[];
  results: ResultModel[];

  constructor(contract: CombinationContract) {
    this.assemblies = contract?.assemblies?.map(i => new AssemblyModel(i)) ?? [];
    this.ballots = contract?.ballots?.map(i => new BallotModel(i)) ?? [];
    this.candidates = contract?.candidates?.map(i => new CandidateModel(i)) ?? [];
    this.elections = contract?.elections?.map(i => new ElectionModel(i)) ?? [];
    this.electorates = contract?.electorates?.map(i => new ElectorateModel(i)) ?? [];
    this.parties = contract?.parties?.map(i => new PartyModel(i)) ?? [];
    this.results = contract?.results?.map(i => new ResultModel(i)) ?? [];
  }
}
