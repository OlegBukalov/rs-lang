import { TestBed } from '@angular/core/testing';

import { AudioCallService } from './audio-call.service';

describe('AudioCallService', () => {
  let service: AudioCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
