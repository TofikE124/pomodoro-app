import { TestBed } from '@angular/core/testing';

import { TimerDurationService } from './timer-duration.service';

describe('TimerDurationService', () => {
  let service: TimerDurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerDurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
