import { TestBed } from '@angular/core/testing';

import { ExitCardGameGuard } from './exit-card-game.guard';

describe('ExitCardGameGuard', () => {
  let guard: ExitCardGameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExitCardGameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
