import { TestBed } from '@angular/core/testing';

import { RowselectService } from './rowselect.service';

describe('RowselectService', () => {
  let service: RowselectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowselectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
