import { TestBed } from '@angular/core/testing';

import { TextBookSettingsService } from './text-book-settings.service';

describe('TextBookSettingsService', () => {
  let service: TextBookSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextBookSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
