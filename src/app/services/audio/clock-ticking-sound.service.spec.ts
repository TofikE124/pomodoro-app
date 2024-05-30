import { TestBed } from '@angular/core/testing';

import { ClockTickingSoundService } from './clock-ticking-sound.service';

describe('ClockTickingSoundService', () => {
  let service: ClockTickingSoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockTickingSoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
