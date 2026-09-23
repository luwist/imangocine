import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCombo } from './create-combo';

describe('CreateCombo', () => {
  let component: CreateCombo;
  let fixture: ComponentFixture<CreateCombo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCombo],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCombo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
