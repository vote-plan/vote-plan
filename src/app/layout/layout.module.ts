import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {NavFooterComponent} from './nav-footer/nav-footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { NavBreadcrumbComponent } from './nav-breadcrumb/nav-breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FontAwesomeModule,
  ],
  declarations: [
    NavBarComponent,
    NavFooterComponent,
    NavBreadcrumbComponent,
  ],
  exports: [
    NavBarComponent,
    NavFooterComponent,
    NavBreadcrumbComponent,
  ]
})
export class LayoutModule { }
