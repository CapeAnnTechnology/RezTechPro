import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueChecklistsComponent } from './venue-checklists.component';

describe('VenueChecklistsComponent', () => {
  let component: VenueChecklistsComponent;
  let fixture: ComponentFixture<VenueChecklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueChecklistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
