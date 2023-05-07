import { TestBed } from '@angular/core/testing';

import { OrderdbService } from './orderdb.service';

describe('OrderdbService', () => {
  let service: OrderdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
