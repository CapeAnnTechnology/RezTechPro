import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueLicensesComponent } from './venue-licenses.component';

describe('VenueLicensesComponent', () => {
  let component: VenueLicensesComponent;
  let fixture: ComponentFixture<VenueLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
