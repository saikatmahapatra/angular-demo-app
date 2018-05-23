import { TestBed, inject } from '@angular/core/testing';

import { SignOnService } from './sign-on.service';

describe('SignOnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignOnService]
    });
  });

  it('should be created', inject([SignOnService], (service: SignOnService) => {
    expect(service).toBeTruthy();
  }));
});
