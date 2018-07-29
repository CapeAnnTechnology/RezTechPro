import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, InspectionService, UtilityService } from '../_services';
import { InspectionModel } from '../_models';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
  providers: [NGXLogger]
})
export class InspectionComponent implements OnInit, OnDestroy {
  pageTitle: string;
  id: string;
  loggedInSub: Subscription;
  routeSub: Subscription;
  tabSub: Subscription;
  inspectionSub: Subscription;
  inspection: InspectionModel;
  loading: boolean;
  error: boolean;
  tab: string;

  constructor( private route: ActivatedRoute,
    		   public auth: AuthService,
    		   private inspectionService: InspectionService,
    		   public utils: UtilityService,
    		   private title: Title
    		  ) { }

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
    // Set inspection ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this._getInspection();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'details';
      });
  }

  private _getInspection() {
    this.loading = true;
    // GET inspection by ID
    this.inspectionSub = this.inspectionService
      .getInspectionById$(this.id)
      .subscribe(
        res => {
          this.inspection = res;
          this._setPageTitle(this.inspection.type);
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
          this._setPageTitle('Inspection Details');
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
    this.inspectionSub.unsubscribe();
  }

}
