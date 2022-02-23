import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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
import {ElectionsRoutingModule} from './elections-routing.module';
import {LayoutModule} from '../layout/layout.module';
import { ElectionsListComponent } from './elections-list/elections-list.component';
import {ElectionsService} from './elections.service';


@NgModule({
  imports: [
    CommonModule,
    ElectionsRoutingModule,
    LayoutModule,
  ],
  declarations: [
    // election
    ElectionsListComponent,
    ElectionsHomeComponent,
    ElectionsUpcomingComponent,
    ElectionsPastComponent,
    ElectionDetailComponent,

    //assembly
    AssembliesElectionComponent,
    AssemblyDetailComponent,

    // electorate
    ElectoratesElectionComponent,
    ElectoratesAssemblyComponent,
    ElectorateDetailComponent,

    // candidate
    CandidatesElectionComponent,
    CandidatesPartyComponent,
    CandidatesAssemblyComponent,
    CandidatesElectorateComponent,
    CandidateDetailComponent,

    // party
    PartiesElectionComponent,
    PartiesAssemblyComponent,
    PartiesElectorateComponent,
    PartyDetailComponent,
  ],
  providers: [
    ElectionsService,
  ]
})
export class ElectionsModule {
}
