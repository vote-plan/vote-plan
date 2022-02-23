import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AboutComponent} from './about/about.component';
import {HelpComponent} from './help/help.component';
import {NewsComponent} from './news/news.component';
import {NotFoundComponent} from './not-found/not-found.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule,
  ],
  declarations: [
    AboutComponent,
    HelpComponent,
    NewsComponent,
    NotFoundComponent,
  ],
  exports: [
    AboutComponent,
    HelpComponent,
    NewsComponent,
    NotFoundComponent,
  ]
})
export class InformationModule {
}
