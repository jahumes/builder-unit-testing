import { TestBed, inject } from '@angular/core/testing';

import { BaseTransformerService } from './base-transformer.service';

describe('BaseTransformerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseTransformerService]
    });
  });

  it('should be created', inject([BaseTransformerService], (service: BaseTransformerService) => {
    expect(service).toBeTruthy();
  }));
});
