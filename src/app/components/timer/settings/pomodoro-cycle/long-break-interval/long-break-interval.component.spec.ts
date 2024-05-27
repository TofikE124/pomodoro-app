import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongBreakIntervalComponent } from './long-break-interval.component';

describe('LongBreakIntervalComponent', () => {
  let component: LongBreakIntervalComponent;
  let fixture: ComponentFixture<LongBreakIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongBreakIntervalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LongBreakIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
