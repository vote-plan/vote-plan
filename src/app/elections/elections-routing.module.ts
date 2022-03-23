import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ElectionsHomeComponent} from './elections-home/elections-home.component';
import {ElectionsUpcomingComponent} from './elections-upcoming/elections-upcoming.component';
import {ElectionsPastComponent} from './elections-past/elections-past.component';
import {ElectionComponent} from './election/election.component';
import {PartiesComponent} from './parties/parties.component';
import {CandidatesComponent} from './candidates/candidates.component';
import {ElectoratePlanComponent} from './electorate-plan/electorate-plan.component';
import {ElectorateResultsComponent} from './electorate-results/electorate-results.component';
import {AssemblyPlanComponent} from './assembly-plan/assembly-plan.component';
import {AssemblyResultsComponent} from './assembly-results/assembly-results.component';


const routes: Routes = [
  {path: '', redirectTo: 'elections', pathMatch: 'full'},
  {path: 'elections', component: ElectionsHomeComponent},
  {path: 'upcoming', component: ElectionsUpcomingComponent},
  {path: 'past', component: ElectionsPastComponent},

  {path: 'elections/:electionCode', component: ElectionComponent},
  {path: 'elections/:electionCode/parties', component: PartiesComponent},
  {path: 'elections/:electionCode/candidates', component: CandidatesComponent},
  {path: 'electorates/:electorateCode/plan', component: ElectoratePlanComponent},
  {path: 'electorates/:electorateCode/results', component: ElectorateResultsComponent},
  {path: 'assemblies/:assemblyCode/plan', component: AssemblyPlanComponent},
  {path: 'assemblies/:assemblyCode/results', component: AssemblyResultsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionsRoutingModule {
}
