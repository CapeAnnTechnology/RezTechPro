import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ChecklistService, EventService, UtilityService, FilterService } from '../_services';
import { EventModel, ChecklistModel, VenueModel } from '../_models';

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

 checklistListSub: Subscription;
 checklistList: ChecklistModel[];
 filteredChecklists: ChecklistModel[];

 loading: boolean;
 error: boolean;
 query: '';
 queryChecklists: '';

 constructor( private title: Title,
    public utility: UtilityService,
    private event: EventService,
    private checklist: ChecklistService,
    public fs: FilterService ) { }

 ngOnInit() {
  this.title.setTitle(this.pageTitle);
  this._getEventList();
  this._getChecklistList();
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

  private _getChecklistList() {
    this.loading = true;
    // Get future, public events
    this.checklistListSub = this.checklist
      .getChecklists$()
      .subscribe(
        res => {
          this.checklistList = res;
          this.filteredChecklists = res;
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
  searchChecklists() {
    this.filteredChecklists = this.fs.search(this.checklistList, this.queryChecklists, '_id', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredEvents = this.eventList;
  }

  resetChecklistQuery() {
    this.queryChecklists = '';
    this.filteredChecklists = this.checklistList;
  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe();
    this.checklistListSub.unsubscribe();
  }

}
