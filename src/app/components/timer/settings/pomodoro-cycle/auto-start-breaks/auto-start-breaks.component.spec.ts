import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoStartBreaksComponent } from './auto-start-breaks.component';

describe('AutoStartBreaksComponent', () => {
  let component: AutoStartBreaksComponent;
  let fixture: ComponentFixture<AutoStartBreaksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoStartBreaksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoStartBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
