import { TestBed } from '@angular/core/testing';

import { RepotsService } from './repots.service';

describe('RepotsService', () => {
  let service: RepotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
