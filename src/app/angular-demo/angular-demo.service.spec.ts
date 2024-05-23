import { TestBed, inject } from '@angular/core/testing';

import { AngularDemoService } from './angular-demo.service';

describe('AngularDemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularDemoService]
    });
  });

  it('should be created', inject([AngularDemoService], (service: AngularDemoService) => {
    expect(service).toBeTruthy();
  }));
});
