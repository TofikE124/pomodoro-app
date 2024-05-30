import { TestBed } from '@angular/core/testing';

import { BackgroundSoundService } from './background-sound.service';

describe('BackgroundSoundService', () => {
  let service: BackgroundSoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundSoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
