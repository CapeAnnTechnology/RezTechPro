import { Component, OnInit } from '@angular/core';
import { VenueModel, User, Address } from '../_models';
import { UserService, VenueService, AddressService } from '../_services';
import { Title } from '@angular/platform-browser';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: [ './dashboard.component.scss' ]
})

export class DashboardComponent implements OnInit {
users: User[] = [];
venues: VenueModel[] = [];
addresses: Address[] = [];
title = 'Dashboard';

constructor(private userService: UserService,
 private venueService: VenueService,
 private addressService: AddressService,
 private titleService: Title
 ) { }

 ngOnInit() {
  this.getUsers();
  this.getVenues();
  this.getAddresses();
  this.setTitle('Dashboard');
 }

 getUsers(): void {
 // this.userService.getUsers()
 //   .subscribe(users => this.users = users.slice(0, 4));
 }

 getVenues(): void {
  this.venueService.getVenues()
  .subscribe(venues => this.venues = venues.slice(0, 4));
 }

 getAddresses(): void {
  this.addressService.getAddresses()
  .subscribe(addresses => this.addresses = addresses);
 }

 public setTitle( newTitle: string) {
  this.titleService.setTitle( newTitle );
 }

}
