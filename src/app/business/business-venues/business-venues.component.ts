import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, BusinessService, FilterService, UtilityService } from './../../_services';
import { BusinessModel } from './../../_models';
import { expandCollapse } from './../../_extras';


@Component({
  selector: 'app-business-venues',
  templateUrl: './business-venues.component.html',
  styleUrls: ['./business-venues.component.scss']
})
export class BusinessVenuesComponent implements OnInit {
  @Input() businessId: string;

  constructor( ) { }

  ngOnInit() {
  }

}
