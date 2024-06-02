import { TestBed } from '@angular/core/testing';

import { TimerButtonService } from './timer-button.service';

describe('TimerButtonService', () => {
  let service: TimerButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
