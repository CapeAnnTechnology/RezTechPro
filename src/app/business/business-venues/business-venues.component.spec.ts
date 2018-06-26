import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessVenuesComponent } from './business-venues.component';

describe('BusinessVenuesComponent', () => {
  let component: BusinessVenuesComponent;
  let fixture: ComponentFixture<BusinessVenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessVenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
