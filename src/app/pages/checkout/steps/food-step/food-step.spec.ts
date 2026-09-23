import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodStep } from './food-step';

describe('FoodStep', () => {
  let component: FoodStep;
  let fixture: ComponentFixture<FoodStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodStep],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
