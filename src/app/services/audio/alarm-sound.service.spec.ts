import { TestBed } from '@angular/core/testing';

import { AlarmSoundService } from './alarm-sound.service';

describe('AlarmSoundService', () => {
  let service: AlarmSoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmSoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
