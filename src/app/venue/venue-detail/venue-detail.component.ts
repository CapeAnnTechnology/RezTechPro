import { Component, Input } from '@angular/core';
import { AuthService, UtilityService } from './../../_services';
import { VenueModel } from './../../_models';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent {
  @Input() venue: VenueModel;

  constructor( public utils: UtilityService,
    		   public auth: AuthService ) { }

}
