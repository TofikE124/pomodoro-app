import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickingSoundComponent } from './ticking-sound.component';

describe('TickingSoundComponent', () => {
  let component: TickingSoundComponent;
  let fixture: ComponentFixture<TickingSoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickingSoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TickingSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
