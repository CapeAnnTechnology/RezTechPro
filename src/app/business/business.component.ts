import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, BusinessService, UtilityService } from '../_services';
import { BusinessModel } from '../_models';
import { phonePipe } from './../_pipes';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  pageTitle: string;
  id: string;
  loggedInSub: Subscription;
  routeSub: Subscription;
  tabSub: Subscription;
  businessSub: Subscription;
  business: BusinessModel;
  loading: boolean;
  error: boolean;
  tab: string;

  constructor( private route: ActivatedRoute,
    		   public auth: AuthService,
    		   private businessService: BusinessService,
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
    // Set event ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this._getBusiness();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'details';
      });
  }

  private _getBusiness() {
    this.loading = true;
    // GET business by ID
    this.businessSub = this.businessService
      .getBusinessById$(this.id)
      .subscribe(
        res => {
          this.business = res;
          this._setPageTitle(this.business.name);
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
          this._setPageTitle('Business Details');
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
    this.businessSub.unsubscribe();
  }

}
