import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, VenueService, FilterService, UtilityService } from './../../_services';
import { ChecklistModel, VenueModel, InspectionModel } from './../../_models';
import { expandCollapse } from './../../_extras';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-venue-inspections',
  templateUrl: './venue-inspections.component.html',
  styleUrls: ['./venue-inspections.component.scss']
})
export class VenueInspectionsComponent implements OnInit {
	@Input() venueId: string;
	inspectionsSub: Subscription;
  	inspections: InspectionModel[];
	loading: boolean;
	error: boolean;
	showAllChecklists = true;
	showVenuesText = 'View All Inspections';
	showEditForm: boolean;
	editBtnText: string;
	api_url = environment.BASE_API;

	constructor(
	public auth: AuthService,
	private venueService: VenueService,
	public utils: UtilityService,
	public fs: FilterService
	) { }

	ngOnInit() {
		this._getInspections();
	}

	private _getInspections() {
		this.loading = true;
		// Get Inspections by venue ID
		this.inspectionsSub = this.venueService
      	  .getInspectionsByVenueId$(this.venueId)
		  .subscribe(
		    res => {
		      this.inspections = res;
		      this.loading = false;
		    },
		    err => {
		      console.error(err);
		      this.loading = false;
		      this.error = true;
		    }
		  );
	}

	ngOnDestroy() {
		this.inspectionsSub.unsubscribe();
	}
}
