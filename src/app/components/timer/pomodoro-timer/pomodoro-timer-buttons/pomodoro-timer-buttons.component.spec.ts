import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroTimerButtonsComponent } from './pomodoro-timer-buttons.component';

describe('PomodoroTimerButtonsComponent', () => {
  let component: PomodoroTimerButtonsComponent;
  let fixture: ComponentFixture<PomodoroTimerButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PomodoroTimerButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PomodoroTimerButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
