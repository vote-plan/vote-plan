import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ElectionsHomeComponent} from './elections-home/elections-home.component';
import {ElectionsUpcomingComponent} from './elections-upcoming/elections-upcoming.component';
import {ElectionsPastComponent} from './elections-past/elections-past.component';
import {ElectionDetailComponent} from './election-detail/election-detail.component';

import {AssembliesElectionComponent} from './assemblies-election/assemblies-election.component';
import {AssemblyDetailComponent} from './assembly-detail/assembly-detail.component';

import {ElectoratesElectionComponent} from './electorates-election/electorates-election.component';
import {ElectoratesAssemblyComponent} from './electorates-assembly/electorates-assembly.component';
import {ElectorateDetailComponent} from './electorate-detail/electorate-detail.component';

import {CandidatesElectionComponent} from './candidates-election/candidates-election.component';
import {CandidatesPartyComponent} from './candidates-party/candidates-party.component';
import {CandidatesAssemblyComponent} from './candidates-assembly/candidates-assembly.component';
import {CandidatesElectorateComponent} from './candidates-electorate/candidates-electorate.component';
import {CandidateDetailComponent} from './candidate-detail/candidate-detail.component';

import {PartiesElectionComponent} from './parties-election/parties-election.component';
import {PartiesAssemblyComponent} from './parties-assembly/parties-assembly.component';
import {PartiesElectorateComponent} from './parties-electorate/parties-electorate.component';
import {PartyDetailComponent} from './party-detail/party-detail.component';

const routes: Routes = [
  // election
  {path: '', component: ElectionsHomeComponent},
  {path: 'upcoming', component: ElectionsUpcomingComponent},
  {path: 'past', component: ElectionsPastComponent},
  {path: ':electionCode', component: ElectionDetailComponent},

  // assembly
  {path: ':electionCode/assemblies', component: AssembliesElectionComponent},
  {path: ':electionCode/assemblies/:assemblyCode', component: AssemblyDetailComponent},

  // electorate
  {path: ':electionCode/electorates', component: ElectoratesElectionComponent},
  {path: ':electionCode/assemblies/:assemblyCode/electorates', component: ElectoratesAssemblyComponent},
  {path: ':electionCode/assemblies/:assemblyCode/electorates/:electorateCode', component: ElectorateDetailComponent},

  // candidate
  {path: ':electionCode/candidates', component: CandidatesElectionComponent},
  {path: ':electionCode/parties/:partyCode/candidates', component: CandidatesPartyComponent},
  {path: ':electionCode/assemblies/:assemblyCode/candidates', component: CandidatesAssemblyComponent},
  {path: ':electionCode/assemblies/:assemblyCode/electorates/:electorateCode/candidates', component: CandidatesElectorateComponent},
  {
    path: ':electionCode/assemblies/:assemblyCode/electorates/:electorateCode/candidates/:candidateCode',
    component: CandidateDetailComponent
  },

  // party
  {path: ':electionCode/parties', component: PartiesElectionComponent},
  {path: ':electionCode/assemblies/:assemblyCode/parties', component: PartiesAssemblyComponent},
  {path: ':electionCode/assemblies/:assemblyCode/electorates/:electorateCode/parties', component: PartiesElectorateComponent},
  {path: ':electionCode/parties/:partyCode', component: PartyDetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionsRoutingModule {
}
