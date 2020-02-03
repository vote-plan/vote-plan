import { TestBed } from '@angular/core/testing';

import { HttpRequestCacheMapService } from './http-request-cache.service';

describe('HttpRequestCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpRequestCacheMapService = TestBed.get(HttpRequestCacheMapService);
    expect(service).toBeTruthy();
  });
});
