import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ElectionsRoutingModule} from './elections-routing.module';
import {ElectionsHomeComponent} from './elections-home/elections-home.component';
import {ElectionDetailComponent} from './election-detail/election-detail.component';
import {AssemblyDetailComponent} from './assembly-detail/assembly-detail.component';
import {ElectorateDetailComponent} from './electorate-detail/electorate-detail.component';
import {CandidateDetailComponent} from './candidate-detail/candidate-detail.component';
import {PartyDetailComponent} from './party-detail/party-detail.component';
import { VoteHomeComponent } from './vote-home/vote-home.component';


@NgModule({
  declarations: [
    ElectionsHomeComponent,
    ElectionDetailComponent,
    AssemblyDetailComponent,
    ElectorateDetailComponent,
    CandidateDetailComponent,
    PartyDetailComponent,
    VoteHomeComponent
  ],
  imports: [
    CommonModule,
    ElectionsRoutingModule
  ]
})
export class ElectionsModule {
}
