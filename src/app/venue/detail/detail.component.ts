import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Venue } from '../../_models';
import { VenueService } from '../../_services';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class VenueDetailComponent implements OnInit {
 @Input() venue: Venue;

 constructor(
  private route: ActivatedRoute,
  private venueService: VenueService,
  private location: Location,
  private titleService: Title ) { }

 ngOnInit() {
  this.getVenue();
 }

 getVenue(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.venueService.getVenue(id)
   .subscribe(	venue => this.venue = venue);
}

 public setTitle( newTitle: string) {
  this.titleService.setTitle( newTitle );
 }

 goBack(): void {
  this.location.back();
 }

}
