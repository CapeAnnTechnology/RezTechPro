import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionNewComponent } from './inspection-new.component';

describe('InspectionNewComponent', () => {
  let component: InspectionNewComponent;
  let fixture: ComponentFixture<InspectionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
