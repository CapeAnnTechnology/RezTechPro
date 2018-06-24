import { Component, Input } from '@angular/core';
import { AuthService, UtilityService } from './../../_services';
import { ChecklistModel } from './../../_models';

@Component({
  selector: 'app-checklist-detail',
  templateUrl: './checklist-detail.component.html',
  styleUrls: ['./checklist-detail.component.scss']
})
export class ChecklistDetailComponent {
  @Input() checklist: ChecklistModel;

  constructor(
    public utils: UtilityService,
    public auth: AuthService
  ) { }

}