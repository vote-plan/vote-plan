import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestCacheService } from '../http-request-cache.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(
    private cache: RequestCacheService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // continue if not cachable
    if (!this.isCachable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);
    return cachedResponse ?
      of(cachedResponse) :
      this.sendRequest(req, next, this.cache);
  }

  private isCachable(req: HttpRequest<any>) {
    // Only GET requests are cachable
    return req.method === 'GET';
  }

  private sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(event => {
        // There may be other events besides the response
        if (event instanceof HttpResponse) {
          // Update the cache
          cache.put(req, event);
        }
      })
    );
  }
}
