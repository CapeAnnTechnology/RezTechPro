import { Component, Input } from '@angular/core';
import { AuthService, UtilityService } from './../../_services';
import { InspectionModel } from './../../_models';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.component.html',
  styleUrls: ['./inspection-detail.component.scss']
})
export class InspectionDetailComponent implements OnInit {
	@Input() inspection: InspectionModel;

  	constructor( public utils: UtilityService,
  				 public auth: AuthService ) { }

}
