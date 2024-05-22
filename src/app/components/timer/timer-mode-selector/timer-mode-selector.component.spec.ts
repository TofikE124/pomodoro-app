import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerModeSelectorComponent } from './timer-mode-selector.component';

describe('TimerModeSelectorComponent', () => {
  let component: TimerModeSelectorComponent;
  let fixture: ComponentFixture<TimerModeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerModeSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimerModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
