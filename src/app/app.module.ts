import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavFooterComponent } from './nav-footer/nav-footer.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { NewsComponent } from './news/news.component';
import { ElectionPrepareComponent } from './election-prepare/election-prepare.component';
import { ElectionResultsComponent } from './election-results/election-results.component';
import { ElectorateResultsComponent } from './electorate-results/electorate-results.component';
import { ElectoratePrepareComponent } from './electorate-prepare/electorate-prepare.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent,
    HomeComponent,
    NavFooterComponent,
    AboutComponent,
    HelpComponent,
    NewsComponent,
    ElectionPrepareComponent,
    ElectionResultsComponent,
    ElectorateResultsComponent,
    ElectoratePrepareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
