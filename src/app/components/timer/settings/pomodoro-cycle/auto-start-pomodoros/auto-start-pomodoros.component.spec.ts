import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoStartPomodorosComponent } from './auto-start-pomodoros.component';

describe('AutoStartPomodorosComponent', () => {
  let component: AutoStartPomodorosComponent;
  let fixture: ComponentFixture<AutoStartPomodorosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoStartPomodorosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoStartPomodorosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
