import { TestBed, inject } from '@angular/core/testing';

import { DynamicComponentLoaderService } from './dynamic-component-loader.service';

describe('DynamicComponentLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicComponentLoaderService]
    });
  });

  it('should be created', inject([DynamicComponentLoaderService], (service: DynamicComponentLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
