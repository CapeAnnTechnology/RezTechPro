import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { AuthService, InspectionService, InspectionFormService } from './../../_services';
import { InspectionModel, FormInspectionModel } from './../../_models';
import { dateValidator, dateRangeValidator } from './../../_validators';
import { DATE_REGEX, TIME_REGEX, stringsToDate } from './../../_factories';

@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.scss'],
  providers: [ InspectionFormService ]
})
export class InspectionFormComponent implements OnInit, OnDestroy {
	@Input() inspection: InspectionModel;
	isEdit: boolean;
	// FormBuilder form
	inspectionForm: FormGroup;
	datesGroup: AbstractControl;
	// Model storing initial form values
	formInspection: FormInspectionModel;
	// Form validation and disabled logic
	formErrors: any;
	formChangeSub: Subscription;
	// Form submission
	submitInspectionObj: InspectionModel;
	submitInspectionSub: Subscription;
	error: boolean;
	submitting: boolean;
	submitBtnText: string;
  routeSub: Subscription;
  loggedInSub: Subscription;
  venueId: string;
  userId: string;

	constructor(
		private fb: FormBuilder,
    private inspectionService: InspectionService,
    private datePipe: DatePipe,
    public auth: AuthService,
    public ifs: InspectionFormService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

	ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => {
        // this.loading = true;
        if (loggedIn) {
          this.userId = this.auth.userProfile.sub.split('|')[1];
          this._routeSubs();
        }
      }
    );
	}

  private _routeSubs() {
    // console.log(this.auth.userProfile);
    this.routeSub = this.route.params
    .subscribe(params => {
    });

    // Set venue ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.venueId = params['id'];

        this.formErrors = this.ifs.formErrors;
        this.isEdit = !!this.inspection;
        this.submitBtnText = this.isEdit ? 'Update Inspection' : 'Create Inspection';
        // Set initial form data
        this.formInspection = this._setFormInspection();
        // Use FormBuilder to construct the form
        this._buildForm();
      });
  }

	private _setFormInspection() {
    if (!this.isEdit) {
      // If creating a new inspection, create new
      // FormInspectionModel with default null data
      return new FormInspectionModel(null, null, null, this.venueId, this.userId, null, null, null, null, null);
    } else {
      // If editing existing inspection, create new
      // FormEventModel from existing data
      // Transform datetimes:
      // https://angular.io/api/common/DatePipe
      // _shortDate: 1/7/2017
      // 'shortTime': 12:05 PM
      const _shortDate = 'M/d/yyyy';
      return new FormInspectionModel(
      	this.inspection.type,
    		this.inspection.inspectionDatetime,
    		this.inspection.expirationDatetime,
    		this.inspection.venueId,
    		this.inspection.userId,
    		this.inspection.timestamp,
    		this.inspection.userAgent,
    		this.inspection.viewPublic,
    		this.inspection.ipAddress,
    		this.inspection.version
      );
    }
  }

  private _buildForm() {
    this.inspectionForm = this.fb.group({
      type: [this.formInspection.type, [
        Validators.required,
        Validators.minLength(this.ifs.textMin),
        Validators.maxLength(this.ifs.textMax)
      ]],
      inspectionDatetime: [this.formInspection.inspectionDatetime, [
          Validators.required,
          Validators.maxLength(this.ifs.dateMax),
          Validators.pattern(DATE_REGEX),
          pastDateValidator()
      ]],
      expirationDatetime: [this.formInspection.expirationDatetime, [
          Validators.required,
          Validators.maxLength(this.ifs.dateMax),
          Validators.pattern(DATE_REGEX),
          dateValidator()
        ]],
      venueId: [this.formInspection.venueId, [
        Validators.required,
        Validators.minLength(this.ifs.textMin),
        Validators.maxLength(this.ifs.textMax)
      ]],
      userId: [this.formInspection.userId, [
        Validators.required,
        Validators.minLength(this.ifs.textMin),
        Validators.maxLength(this.ifs.textMax)
      ]],
      // location: [this.formEvent.location, [
      //   Validators.required,
      //   Validators.minLength(this.ifs.textMin),
      //   Validators.maxLength(this.ifs.locMax)
      // ]],
      // viewPublic: [this.formEvent.viewPublic,
      //   Validators.required
      // ],
      version: [this.formInspection.version,
        Validators.maxLength(this.ifs.descMax)
      ],
    });
    // Set local property to eventForm datesGroup control
    // this.datesGroup = this.eventForm.get('datesGroup');

    // Subscribe to form value changes
    this.formChangeSub = this.inspectionForm
      .valueChanges
      .subscribe(data => this._onValueChanged());

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an event that is no
    // longer valid (for example, an event in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.inspectionForm);
      _markDirty(this.datesGroup);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.inspectionForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.ifs.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = '';
          _setErrMsgs(this.inspectionForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {
    // const startDate = this.datesGroup.get('startDate').value;
    // const startTime = this.datesGroup.get('startTime').value;
    // const endDate = this.datesGroup.get('endDate').value;
    // const endTime = this.datesGroup.get('endTime').value;
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel for submission
    return new InspectionModel(
        this.inspectionForm.get('type').value, //.type,
        this.inspectionForm.get('inspectionDatetime').value, // .inspectionDatetime,
        this.inspectionForm.get('expirationDatetime').value, // .expirationDatetime,
        this.inspectionForm.get('venueId').value, // .venueId,
        this.inspectionForm.get('userId').value, // .userId,
        this.inspectionForm.get('timestamp').value, // .timestamp,
        this.inspectionForm.get('userAgent').value, // .userAgent,
        this.inspectionForm.get('viewPublic').value, // .viewPublic,
        this.inspectionForm.get('ipAddress').value, // .ipAddress,
        this.inspectionForm.get('version').value, // .version,
        this.inspection ? this.inspection._id : null
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitInspectionObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitInspectionSub = this.inspectionService
        .postInspection$(this.submitInspectionObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitInspectionSub = this.inspectionService
        .editInspection$(this.inspection._id, this.submitInspectionObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }
	private _handleSubmitSuccess(res) {
		this.error = false;
		this.submitting = false;
		// Redirect to inspection detail
		this.router.navigate(['/inspection', res._id]);
	}

	private _handleSubmitError(err) {
		console.error(err);
		this.submitting = false;
		this.error = true;
	}

	resetForm() {
    	this.inspectionForm.reset();
  	}

	ngOnDestroy() {
		if (this.submitInspectionSub) {
		  this.submitInspectionSub.unsubscribe();
		}
		this.formChangeSub.unsubscribe();
	}

}
