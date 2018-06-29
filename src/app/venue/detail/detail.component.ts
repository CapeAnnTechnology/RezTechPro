import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { VenueModel } from '../../_models';
import { AuthService, UtilityService, VenueService } from '../../_services';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  pageTitle: string;
  id: string;
  loggedInSub: Subscription;
  routeSub: Subscription;
  tabSub: Subscription;
  venueSub: Subscription;
  venue: VenueModel;
  loading: boolean;
  error: boolean;
  tab: string;

 constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private venueService: VenueService,
    public utils: UtilityService,
    private title: Title,
    private location: Location, ) { }

 ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => {
        this.loading = true;
        if (loggedIn) {
          this._routeSubs();
        }
      }
    );
  }

  private _routeSubs() {
    // Set checklist ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this._getVenue();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'details';
      });
  }

//  getVenue(): void {
//   const id = +this.route.snapshot.paramMap.get('id');
//   this.venueService.getVenue(id)
//    .subscribe(	venue => this.venue = venue);
// }

private _getVenue() {
    this.loading = true;
    // GET checklist by ID
    this.venueSub = this.venueService
      .getVenueById$(this.id)
      .subscribe(
        res => {
          this.venue = res;
          this._setPageTitle(this.venue.title);
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
          this._setPageTitle('Venue Details');
        }
      );
  }

  private _setPageTitle(title: string) {
    this.pageTitle = title;
    this.title.setTitle(title);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.venueSub.unsubscribe();
  }

 goBack(): void {
  this.location.back();
 }

}
