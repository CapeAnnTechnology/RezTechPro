import { Component, Input } from '@angular/core';
import { AuthService, UtilityService } from './../../_services';
import {BusinessModel} from './../../_models';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent {
  @Input() business: BusinessModel;

  constructor( public utils: UtilityService,
    		   public auth: AuthService ) { }

}
