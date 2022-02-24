import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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

import {ElectionsRoutingModule} from './elections-routing.module';
import {LayoutModule} from '../layout/layout.module';
import {ElectionsService} from './elections.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ElectionsListComponent} from './elections-list/elections-list.component';


@NgModule({
  imports: [
    CommonModule,
    ElectionsRoutingModule,
    LayoutModule,
    FontAwesomeModule,
  ],
  declarations: [
    ElectionsListComponent,
    ElectionsHomeComponent,
    ElectionsUpcomingComponent,
    ElectionsPastComponent,
    ElectionComponent,
    PartiesComponent,
    CandidatesComponent,
    ElectoratePlanComponent,
    ElectorateResultsComponent,
    AssemblyPlanComponent,
    AssemblyResultsComponent,
  ],
  providers: [
    ElectionsService,
  ]
})
export class ElectionsModule {
}
