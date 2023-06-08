import { TestBed } from '@angular/core/testing';

import { AllEventService } from './all-event.service';

describe('AllEventService', () => {
  let service: AllEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
