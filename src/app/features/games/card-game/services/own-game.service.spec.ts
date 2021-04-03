import { TestBed } from '@angular/core/testing';

import { OwnGameService } from './own-game.service';

describe('OwnGameService', () => {
  let service: OwnGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
