import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './information/not-found/not-found.component';
import {AboutComponent} from './information/about/about.component';
import {NewsComponent} from './information/news/news.component';
import {HelpComponent} from './information/help/help.component';


const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'news', component: NewsComponent},
  {path: 'help', component: HelpComponent},
  {path: '', loadChildren: () => import('./elections/elections.module').then(m => m.ElectionsModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
