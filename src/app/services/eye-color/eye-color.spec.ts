import { TestBed } from '@angular/core/testing';
import { EyeColor } from './eye-color';

describe('EyeColor', () => {
  let service: EyeColor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EyeColor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
