import { TestBed, inject } from '@angular/core/testing';

import { ChecklistFormService } from './checklist-form.service';

describe('ChecklistFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChecklistFormService]
    });
  });

  it('should be created', inject([ChecklistFormService], (service: ChecklistFormService) => {
    expect(service).toBeTruthy();
  }));
});
