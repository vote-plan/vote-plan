import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionsRoutingModule } from './elections-routing.module';
import { ElectionsHomeComponent } from './elections-home/elections-home.component';
import { ElectionDetailComponent } from './election-detail/election-detail.component';
import { AssemblyDetailComponent } from './assembly-detail/assembly-detail.component';
import { ElectorateDetailComponent } from './electorate-detail/electorate-detail.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { VoteHomeComponent } from './vote-home/vote-home.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';


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
        ElectionsRoutingModule,
        NgbCarouselModule,
        FontAwesomeModule,
        MomentModule
    ]
})
export class ElectionsModule {
}
