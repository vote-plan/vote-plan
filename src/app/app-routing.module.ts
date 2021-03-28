import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AboutComponent} from './about/about.component';
import {NewsComponent} from './news/news.component';
import {HelpComponent} from './help/help.component';
import {ElectionPrepareComponent} from './election-prepare/election-prepare.component';
import {ElectionResultsComponent} from './election-results/election-results.component';
import {ElectoratePrepareComponent} from './electorate-prepare/electorate-prepare.component';
import {ElectorateResultsComponent} from './electorate-results/electorate-results.component';


const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'news', component: NewsComponent},
  {path: 'help', component: HelpComponent},
  {path: 'election/:id/prepare', component: ElectionPrepareComponent},
  {path: 'election/:id/results', component: ElectionResultsComponent},
  {path: 'electorate/:id/prepare', component: ElectoratePrepareComponent},
  {path: 'electorate/:id/results', component: ElectorateResultsComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
