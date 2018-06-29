import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, VenueService, FilterService, UtilityService } from './../../_services';
import { ChecklistModel, VenueModel } from './../../_models';
import { expandCollapse } from './../../_extras';


@Component({
  selector: 'app-venue-checklists',
  templateUrl: './venue-checklists.component.html',
  styleUrls: ['./venue-checklists.component.scss'],
  animations: [expandCollapse]
})
export class VenueChecklistsComponent implements OnInit {
  @Input() venueId: string;
  checklistsSub: Subscription;
  checklists: ChecklistModel[];
  loading: boolean;
  error: boolean;
  showAllVenues = true;
  showVenuesText = 'View All Checklists';
  showEditForm: boolean;
  editBtnText: string;

  constructor(
    public auth: AuthService,
    private venueService: VenueService,
    public utils: UtilityService,
    public fs: FilterService
  ) { }

  ngOnInit() {
    this._getChecklists();
    this.toggleEditForm(false);

  }

  private _getChecklists() {
    this.loading = true;
    // Get RSVPs by event ID
    this.checklistsSub = this.venueService
      .getChecklistsByVenueId$(this.venueId)
      .subscribe(
        res => {
          this.checklists = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  toggleShowChecklists() {
    this.showAllVenues = !this.showAllVenues;
    this.showVenuesText = this.showAllVenues ? 'Hide Venues' : 'Show All Venues';
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit My Venue';
  }

  ngOnDestroy() {
    this.checklistsSub.unsubscribe();
  }

}
