import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ElectionsModule} from './elections/elections.module';
import {InformationModule} from './information/information.module';
import {LayoutModule as AppLayoutModule} from './layout/layout.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // angular and dependency imports
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgbModule,
    FontAwesomeModule,
    // app imports
    AppLayoutModule,
    InformationModule,
    ElectionsModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
