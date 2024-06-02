import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSoundComponent } from './alarm-sound.component';

describe('AlarmSoundComponent', () => {
  let component: AlarmSoundComponent;
  let fixture: ComponentFixture<AlarmSoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmSoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
