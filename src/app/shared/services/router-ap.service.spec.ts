import { TestBed, inject } from '@angular/core/testing';

import { RouterAPService } from './router-ap.service';

describe('RouterAPService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterAPService]
    });
  });

  it('should be created', inject([RouterAPService], (service: RouterAPService) => {
    expect(service).toBeTruthy();
  }));
});
