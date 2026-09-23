import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeatsStep } from './seats-step';

describe('SeatsStep', () => {
  let component: SeatsStep;
  let fixture: ComponentFixture<SeatsStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatsStep],
    }).compileComponents();

    fixture = TestBed.createComponent(SeatsStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
