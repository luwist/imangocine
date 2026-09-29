import { TestBed } from '@angular/core/testing';
import { MovieGenre } from './movie-genre';

describe('MovieGenre', () => {
  let service: MovieGenre;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieGenre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
