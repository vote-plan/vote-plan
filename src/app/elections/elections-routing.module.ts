import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ElectionsHomeComponent} from './elections-home/elections-home.component';
import {ElectionDetailComponent} from './election-detail/election-detail.component';
import {AssemblyDetailComponent} from './assembly-detail/assembly-detail.component';
import {ElectorateDetailComponent} from './electorate-detail/electorate-detail.component';
import {CandidateDetailComponent} from './candidate-detail/candidate-detail.component';
import {PartyDetailComponent} from './party-detail/party-detail.component';
import {VoteHomeComponent} from './vote-home/vote-home.component';


const routes: Routes = [
  {path: 'vote/:electorate_code', component: VoteHomeComponent},
  {path: 'home', component: ElectionsHomeComponent},
  {path: 'election/:election_code', component: ElectionDetailComponent},
  {path: 'assembly/:assembly_code', component: AssemblyDetailComponent},
  {path: 'electorate/:electorate_code', component: ElectorateDetailComponent},
  {path: 'candidate/:candidate_code', component: CandidateDetailComponent},
  {path: 'party/:party_code', component: PartyDetailComponent},
  // {path: 'ballot-sections/:ballot_section_code', component: BallotSectionDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionsRoutingModule {
}
