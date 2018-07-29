import { TestBed, inject } from '@angular/core/testing';

import { InspectionFormService } from './inspection-form.service';

describe('InspectionFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionFormService]
    });
  });

  it('should be created', inject([InspectionFormService], (service: InspectionFormService) => {
    expect(service).toBeTruthy();
  }));
});
