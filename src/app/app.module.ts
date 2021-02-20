import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ElectionsModule} from './elections/elections.module';
import {AboutComponent} from './main/about/about.component';
import {NewsComponent} from './main/news/news.component';
import {HelpComponent} from './main/help/help.component';
import {PageNotFoundComponent} from './main/page-not-found/page-not-found.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppNotificationComponent} from './shared/app-notification/app-notification.component';
import {AppNavbarComponent} from './shared/app-navbar/app-navbar.component';
import {AppBreadcrumbComponent} from './shared/app-breadcrumb/app-breadcrumb.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpErrorHandlerService} from './main/http-error-handler.service';
import {MessageService} from './main/message.service';
import {HttpRequestCacheMapService, RequestCacheService} from './main/http-request-cache.service';
import {CachingInterceptor} from './main/caching-interceptor';
import {MomentModule} from 'ngx-moment';
import {ReactiveFormsModule} from '@angular/forms';

/** "Barrel" of Http Interceptors
 * see https://angular.io/guide/http#http-interceptorsHttp interceptor providers in outside-in order
 * Angular applies interceptors in the order that you provide them.
 * If you provide interceptors A, then B, then C, requests will flow in A->B->C and responses will flow out C->B->A.
 * You cannot change the order or remove interceptors later.
 * If you need to enable and disable an interceptor dynamically, you'll have to build that capability into the interceptor itself.
 */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
];


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NewsComponent,
    HelpComponent,
    PageNotFoundComponent,
    AppNotificationComponent,
    AppNavbarComponent,
    AppBreadcrumbComponent
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
    ReactiveFormsModule,
  ],
  providers: [
    Title,
    HttpErrorHandlerService,
    MessageService,
    {provide: RequestCacheService, useClass: HttpRequestCacheMapService},
    httpInterceptorProviders,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
