import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectionFontComponent } from './multi-selection-font.component';

describe('MultiSelectionFontComponent', () => {
  let component: MultiSelectionFontComponent;
  let fixture: ComponentFixture<MultiSelectionFontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectionFontComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiSelectionFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
