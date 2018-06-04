import { Component, OnInit } from '@angular/core';

import { Venue } from '../venue';
import { User } from '../user';

import { UserService } from '../user.service';
import { VenueService } from '../venue.service';

 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
	users: User[] = [];

	venues: Venue[] = [];

	title = "Dashboard"

	constructor(private userService: UserService,
				private venueService: VenueService) { }

	ngOnInit() {
		this.getUsers();
		this.getVenues();
	}

	getUsers(): void {
	    this.userService.getUsers()
	      .subscribe(users => this.users = users.slice(0, 4));
	}

	getVenues(): void {
	    this.venueService.getVenues()
	      .subscribe(venues => this.venues = venues.slice(0, 4));
	}
 
}