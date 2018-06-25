import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventService, AuthService, UtilityService } from './../../_services';
import { EventModel } from './../../_models';


@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit, OnDestroy {
  pageTitle = 'Update Event';
  routeSub: Subscription;
  eventSub: Subscription;
  event: EventModel;
  loading: boolean;
  error: boolean;
  private _id: string;
  tabSub: Subscription;
  tab: string;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private eventService: EventService,
    public utils: UtilityService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    // Set event ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getEvent();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'edit';
      });
  }

  private _getEvent() {
    this.loading = true;
    // GET event by ID
    this.eventSub = this.eventService
      .getEventById$(this._id)
      .subscribe(
        res => {
          this.event = res;
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
    this.routeSub.unsubscribe();
    this.eventSub.unsubscribe();
    this.tabSub.unsubscribe();
  }

}