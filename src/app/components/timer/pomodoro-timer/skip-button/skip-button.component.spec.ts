import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipButtonComponent } from './skip-button.component';

describe('SkipButtonComponent', () => {
  let component: SkipButtonComponent;
  let fixture: ComponentFixture<SkipButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkipButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
