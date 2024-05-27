import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroCycleComponent } from './pomodoro-cycle.component';

describe('PomodoroCycleComponent', () => {
  let component: PomodoroCycleComponent;
  let fixture: ComponentFixture<PomodoroCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PomodoroCycleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PomodoroCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
