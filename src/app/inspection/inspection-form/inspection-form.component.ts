import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { InspectionService } from './../../_services';
import { InspectionModel, FormInspectionModel } from './../../_models';
import { dateValidator, dateRangeValidator } from './../../_validators';
import { DATE_REGEX, TIME_REGEX, stringsToDate } from './../../_factories';
import { InspectionFormService } from './../../_services';


@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.scss']
})
export class InspectionFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
