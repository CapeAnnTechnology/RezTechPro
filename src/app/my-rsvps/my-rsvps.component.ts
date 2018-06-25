import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { AuthService, EventService, FilterService, UtilityService } from './../_services';
import { EventModel } from './../_models';

@Component({
  selector: 'app-my-rsvps',
  templateUrl: './my-rsvps.component.html',
  styleUrls: ['./my-rsvps.component.scss']
})
export class MyRsvpsComponent implements OnInit, OnDestroy {
  pageTitle = 'My RSVPs';
  loggedInSub: Subscription;
  eventListSub: Subscription;
  eventList: EventModel[];
  loading: boolean;
  error: boolean;
  userIdp: string;

  constructor(
    private title: Title,
    public auth: AuthService,
    private eventService: EventService,
    public fs: FilterService,
    public utils: UtilityService
  ) { }

  ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => {
        this.loading = true;
        if (loggedIn) {
          this._getEventList();
        }
      }
    );
    this.title.setTitle(this.pageTitle);
  }

  private _getEventList() {
    // Get events user has RSVPed to
    this.eventListSub = this.eventService
      .getUserEvents$(this.auth.userProfile.sub)
      .subscribe(
        res => {
          this.eventList = res;
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
    this.loggedInSub.unsubscribe();
    this.eventListSub.unsubscribe();
  }

}