import { Component, OnInit } from '@angular/core';

import { Venue } from '../venue';
import { User } from '../user';
import { Address } from '../address';

import { UserService } from '../user.service';
import { VenueService } from '../venue.service';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
	users: User[] = [];

	venues: Venue[] = [];

	addresses: Address[] = [];

	title = "Dashboard"

	constructor(private userService: UserService,
				private venueService: VenueService,
				private addressService: AddressService) { }

	ngOnInit() {
		this.getUsers();
		this.getVenues();
		this.getAddresses();
	}

	getUsers(): void {
	    this.userService.getUsers()
	      .subscribe(users => this.users = users.slice(0, 4));
	}

	getVenues(): void {
	    this.venueService.getVenues()
	      .subscribe(venues => this.venues = venues.slice(0, 4));
	}

	getAddresses(): void {
	    this.addressService.getAddresses()
	      .subscribe(addresses => this.addresses = addresses);
	}
 
}