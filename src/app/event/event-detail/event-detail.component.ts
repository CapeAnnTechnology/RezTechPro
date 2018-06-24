import { Component, Input } from '@angular/core';
import { AuthService, UtilityService } from './../../_services';
import { EventModel } from './../../_models';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  @Input() event: EventModel;

  constructor(
    public utils: UtilityService,
    public auth: AuthService
  ) { }

}