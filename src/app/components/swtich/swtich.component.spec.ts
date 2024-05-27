import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwtichComponent } from './swtich.component';

describe('SwtichComponent', () => {
  let component: SwtichComponent;
  let fixture: ComponentFixture<SwtichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwtichComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwtichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
