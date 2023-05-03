import { TestBed } from '@angular/core/testing';

import { AccountdbService } from './accountdb.service';

describe('AccountdbService', () => {
  let service: AccountdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
