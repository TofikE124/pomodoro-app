import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallIconComponent } from './small-icon.component';

describe('SmallIconComponent', () => {
  let component: SmallIconComponent;
  let fixture: ComponentFixture<SmallIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
