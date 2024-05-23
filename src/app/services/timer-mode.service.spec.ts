import { TestBed } from '@angular/core/testing';

import { TimerModeService } from './timer-mode.service';

describe('TimerModeService', () => {
  let service: TimerModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
