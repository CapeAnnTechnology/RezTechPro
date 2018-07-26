import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueInspectionsComponent } from './venue-inspections.component';

describe('VenueInspectionsComponent', () => {
  let component: VenueInspectionsComponent;
  let fixture: ComponentFixture<VenueInspectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueInspectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
