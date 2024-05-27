import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectionColorComponent } from './multi-selection-color.component';

describe('MultiSelectionColorComponent', () => {
  let component: MultiSelectionColorComponent;
  let fixture: ComponentFixture<MultiSelectionColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectionColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiSelectionColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
