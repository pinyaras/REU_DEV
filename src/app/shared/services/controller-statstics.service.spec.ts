import { TestBed, inject } from '@angular/core/testing';

import { ControllerStatsticsService } from './controller-statstics.service';

describe('ControllerStatsticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControllerStatsticsService]
    });
  });

  it('should be created', inject([ControllerStatsticsService], (service: ControllerStatsticsService) => {
    expect(service).toBeTruthy();
  }));
});
