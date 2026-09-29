import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodCardSkeleton } from './food-card-skeleton';

describe('FoodCardSkeleton', () => {
  let component: FoodCardSkeleton;
  let fixture: ComponentFixture<FoodCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodCardSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodCardSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
