import { TestBed } from '@angular/core/testing';

import { OpenLibraryService } from './trending-service.service';

describe('TrendingServiceService', () => {
  let service: OpenLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
