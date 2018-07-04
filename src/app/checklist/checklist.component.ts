import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, ChecklistService, UtilityService } from '../_services';
import { ChecklistModel } from './../_models';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit, OnDestroy {
  pageTitle: string;
  id: string;
  loggedInSub: Subscription;
  routeSub: Subscription;
  tabSub: Subscription;
  checklistSub: Subscription;
  checklist: ChecklistModel;
  loading: boolean;
  error: boolean;
  tab: string;
  checklistPast: boolean;
  api_url = environment.BASE_API;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private checklistService: ChecklistService,
    public utils: UtilityService,
    private title: Title,
    private datePipe: DatePipe
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
    // Set checklist ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this._getChecklist();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'details';
      });
  }

  private _getChecklist() {
    this.loading = true;
    // GET checklist by ID
    this.checklistSub = this.checklistService
      .getChecklistById$(this.id)
      .subscribe(
        res => {
          this.checklist = res;
          this._setPageTitle(this.checklist.venueId.title+' Checklist '+this.datePipe.transform(this.checklist.timestamp,'fullDate'));
          this.loading = false;
          this.checklistPast = this.utils.eventPast(this.checklist.endDatetime);
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
          this._setPageTitle('Checklist Details');
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
    this.checklistSub.unsubscribe();
  }

}