import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumbTitle: 'Home' } },
  { path: 'about', component: AboutComponent, data: { breadcrumbTitle: 'About' } },
  { path: '**', component: PageNotFoundComponent, data: { breadcrumbTitle: 'Page Not Found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
