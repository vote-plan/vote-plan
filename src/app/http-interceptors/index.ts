import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from './caching-interceptor';


/** "Barrel" of Http Interceptors
 * see https://angular.io/guide/http#http-interceptorsHttp interceptor providers in outside-in order
 * Angular applies interceptors in the order that you provide them.
 * If you provide interceptors A, then B, then C, requests will flow in A->B->C and responses will flow out C->B->A.
 * You cannot change the order or remove interceptors later.
 * If you need to enable and disable an interceptor dynamically, you'll have to build that capability into the interceptor itself.
 */
export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
];
