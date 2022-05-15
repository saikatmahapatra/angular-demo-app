import { TestBed, inject } from '@angular/core/testing';

import { KoreAiService } from './kore-ai.service';

describe('KoreAiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KoreAiService]
    });
  });

  it('should be created', inject([KoreAiService], (service: KoreAiService) => {
    expect(service).toBeTruthy();
  }));
});
