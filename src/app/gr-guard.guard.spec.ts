import { TestBed } from '@angular/core/testing';

import { GrGuardGuard } from './gr-guard.guard';

describe('GrGuardGuard', () => {
  let guard: GrGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GrGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
