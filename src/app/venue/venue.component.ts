import { Component, OnInit } from '@angular/core';

import { Venue } from '../_models/venue';

import { VenueService } from '../_services/venue.service';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {

	venues: Venue[] = [];

  	constructor(private venueService: VenueService,
  				private titleService: Title,) { }

	ngOnInit() {
		this.getVenues();
		this.setTitle("Venues");
	}

	getVenues(): void {
	    this.venueService.getVenues()
	      .subscribe(venues => this.venues = venues.slice(0, 4));
	}

	public setTitle( newTitle: string) {
	    this.titleService.setTitle( newTitle );
	  }

}
