import { TestBed } from '@angular/core/testing';
import { CandyBar } from './candy-bar';

describe('CandyBar', () => {
  let service: CandyBar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandyBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
