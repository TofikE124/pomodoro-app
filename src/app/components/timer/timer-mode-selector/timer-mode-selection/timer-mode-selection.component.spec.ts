import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerModeSelectionComponent } from './timer-mode-selection.component';

describe('TimerModeSelectionComponent', () => {
  let component: TimerModeSelectionComponent;
  let fixture: ComponentFixture<TimerModeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerModeSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimerModeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
