import { TestBed, inject } from '@angular/core/testing';

import { NgExampleService } from './ng-example.service';

describe('NgExampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgExampleService]
    });
  });

  it('should be created', inject([NgExampleService], (service: NgExampleService) => {
    expect(service).toBeTruthy();
  }));
});
