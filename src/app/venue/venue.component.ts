import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, VenueService, UtilityService } from '../_services';
import { VenueModel } from '../_models';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss'],
  providers: [NGXLogger]
})
export class VenueComponent implements OnInit {
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

  constructor( private route: ActivatedRoute,
    		   public auth: AuthService,
    		   private venueService: VenueService,
    		   public utils: UtilityService,
    		   private title: Title ) { }

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
    // Set venue ID from route params and subscribe
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

  private _getVenue() {
    this.loading = true;
    // GET business by ID
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

}
