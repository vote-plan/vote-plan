import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { AboutComponent } from './main/about/about.component';
import {NewsComponent} from './main/news/news.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
