import { TestBed } from '@angular/core/testing';

import { PushnotifyService } from './pushnotify.service';

describe('PushnotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PushnotifyService = TestBed.get(PushnotifyService);
    expect(service).toBeTruthy();
  });
});
