import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { MessageService } from './message.service';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class RequestCacheService {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;

  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

/**
 * maximum cache age (ms)
 */
const maxAge = 30 * 60 * 1000;  // 30 minutes

/**
 * From https://github.com/angular/angular/blob/master/aio/content/examples/http/src/app/request-cache.service.ts
 */
@Injectable({
  providedIn: 'root'
})
export class HttpRequestCacheMapService implements RequestCacheService {

  cache = new Map<string, RequestCacheEntry>();

  constructor(private messenger: MessageService) {
  }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    if (isExpired) {
      this.messenger.debug(`[HttpRequestCacheMapService] Found expired cached response, returning undefined for "${url}".`);
    } else {
      this.messenger.debug(`[HttpRequestCacheMapService] Returning cached response for "${url}".`);
    }

    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    this.messenger.debug(`[HttpRequestCacheMapService] Caching response from "${url}".`);

    const entry = {url, response, lastRead: Date.now()};
    this.cache.set(url, entry);

    // remove expired cache entries
    const expired = Date.now() - maxAge;
    this.cache.forEach(cacheEntry => {
      if (cacheEntry.lastRead < expired) {
        this.cache.delete(cacheEntry.url);
      }
    });

    this.messenger.debug(`[HttpRequestCacheMapService] Request cache size: ${this.cache.size}.`);
  }
}
