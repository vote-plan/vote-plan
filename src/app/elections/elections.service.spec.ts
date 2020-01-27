import { TestBed } from '@angular/core/testing';

import { ElectionsService } from './elections.service';

describe('ElectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectionsService = TestBed.get(ElectionsService);
    expect(service).toBeTruthy();
  });
});
