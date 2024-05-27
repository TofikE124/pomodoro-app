import { TestBed } from '@angular/core/testing';

import { PomodoroCycleService } from './pomodoro-cycle.service';

describe('PomodoroCycleService', () => {
  let service: PomodoroCycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomodoroCycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
