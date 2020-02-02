import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { AboutComponent } from './main/about/about.component';
import { ElectionsModule } from './elections/elections.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppNavbarComponent } from './shared/app-navbar/app-navbar.component';
import { AppBreadcrumbComponent } from './shared/app-breadcrumb/app-breadcrumb.component';
import { NewsComponent } from './main/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AboutComponent,
    AppNavbarComponent,
    AppBreadcrumbComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ElectionsModule,
    AppRoutingModule,
  ],
  providers: [
    Title,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
