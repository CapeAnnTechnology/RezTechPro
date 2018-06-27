import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, BusinessService, FilterService, UtilityService } from './../../_services';
import { VenueModel } from './../../_models';
import { expandCollapse } from './../../_extras';


@Component({
  selector: 'app-business-venues',
  templateUrl: './business-venues.component.html',
  styleUrls: ['./business-venues.component.scss'],
  animations: [expandCollapse]
})
export class BusinessVenuesComponent implements OnInit {
  @Input() businessId: string;
  venuesSub: Subscription;
  venues: VenueModel[];
  loading: boolean;
  error: boolean;
  userVenue: VenueModel;
  showAllVenues = true;
  showVenuesText = 'View All Venues';
  showEditForm: boolean;
  editBtnText: string;

  constructor(
    public auth: AuthService,
    private businessService: BusinessService,
    public utils: UtilityService,
    public fs: FilterService
  ) { }

  ngOnInit() {
    this._getVenues();
    this.toggleEditForm(false);

  }

  private _getVenues() {
    this.loading = true;
    // Get RSVPs by event ID
    this.venuesSub = this.businessService
      .getVenuesByBusinessId$(this.businessId)
      .subscribe(
        res => {
          this.venues = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  toggleShowVenues() {
    this.showAllVenues = !this.showAllVenues;
    this.showVenuesText = this.showAllVenues ? 'Hide Venues' : 'Show All Venues';
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit My Venue';
  }

  ngOnDestroy() {
    this.venuesSub.unsubscribe();
  }

}
