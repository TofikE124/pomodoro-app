import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeDurationSettingsComponent } from './mode-duration-settings.component';

describe('ModeDurationSettingsComponent', () => {
  let component: ModeDurationSettingsComponent;
  let fixture: ComponentFixture<ModeDurationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeDurationSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeDurationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
