import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { EventService, UtilityService, FilterService } from '../_services';
import { EventModel } from '../_models';

@Component({
 selector: 'app-home',
 templateUrl: 'home.component.html',
 styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
 pageTitle = 'Home';
 eventListSub: Subscription;
 eventList: EventModel[];
 filteredEvents: EventModel[];
 loading: boolean;
 error: boolean;
 query: '';

 constructor( private title: Title,
    public utility: UtilityService,
    private event: EventService,
    public fs: FilterService ) { }

 ngOnInit() {
  this.title.setTitle(this.pageTitle);
  this._getEventList();
 }

 private _getEventList() {
    this.loading = true;
    // Get future, public events
    this.eventListSub = this.event
      .getEvents$()
      .subscribe(
        res => {
          this.eventList = res;
          this.filteredEvents = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchEvents() {
    this.filteredEvents = this.fs.search(this.eventList, this.query, '_id', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredEvents = this.eventList;
  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe();
  }

}
