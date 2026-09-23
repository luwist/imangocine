import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowtimeStep } from './showtime-step';

describe('ShowtimeStep', () => {
  let component: ShowtimeStep;
  let fixture: ComponentFixture<ShowtimeStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtimeStep],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowtimeStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
