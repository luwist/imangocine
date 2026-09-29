import { TestBed } from '@angular/core/testing';
import { SessionId } from './session-id';

describe('SessionId', () => {
  let service: SessionId;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionId);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
