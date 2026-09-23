import { TestBed } from '@angular/core/testing';
import { ComboCategory } from './combo-category';

describe('ComboCategory', () => {
  let service: ComboCategory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComboCategory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
