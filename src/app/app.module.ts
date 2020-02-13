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
import { HttpInterceptorProviders } from './http-interceptors';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { MessageService } from './message.service';
import { HttpRequestCacheMapService, RequestCacheService } from './http-request-cache.service';
import { AppNotificationComponent } from './shared/app-notification/app-notification.component';
import { MomentModule } from 'ngx-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HelpComponent } from './main/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AboutComponent,
    AppNavbarComponent,
    AppBreadcrumbComponent,
    NewsComponent,
    AppNotificationComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ElectionsModule,
    MomentModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    Title,
    HttpErrorHandlerService,
    MessageService,
    {provide: RequestCacheService, useClass: HttpRequestCacheMapService},
    HttpInterceptorProviders,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
