import { TestBed } from '@angular/core/testing';
import { CheckoutNavigation } from './checkout-navigation';

describe('CheckoutNavigation', () => {
  let service: CheckoutNavigation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutNavigation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
