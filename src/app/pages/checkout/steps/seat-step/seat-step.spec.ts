import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeatStep } from './seat-step';

describe('SeatStep', () => {
  let component: SeatStep;
  let fixture: ComponentFixture<SeatStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatStep],
    }).compileComponents();

    fixture = TestBed.createComponent(SeatStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
