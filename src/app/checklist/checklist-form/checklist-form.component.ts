import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { ChecklistService } from './../../_services';
import { ChecklistModel, FormChecklistModel } from './../../_models';
import { dateValidator, dateRangeValidator } from './../../_validators';
import { DATE_REGEX, TIME_REGEX, stringsToDate } from './../../_factories';
import { ChecklistFormService } from './../../_services';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.scss'],
  providers: [ ChecklistFormService ]
})
export class ChecklistFormComponent implements OnInit, OnDestroy {
  @Input() checklist: ChecklistModel;
  isEdit: boolean;
  // FormBuilder form
  checklistForm: FormGroup;
  datesGroup: AbstractControl;
  // Model storing initial form values
  formChecklist: FormChecklistModel;
  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;
  // Form submission
  submitChecklistObj: ChecklistModel;
  submitChecklistSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private checklistService: ChecklistService,
    private datePipe: DatePipe,
    public ef: ChecklistFormService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formErrors = this.ef.formErrors;
    this.isEdit = !!this.checklist;
    this.submitBtnText = this.isEdit ? 'Update Checklist' : 'Create Checklist';
    // Set initial form data
    this.formChecklist = this._setFormChecklist();
    // Use FormBuilder to construct the form
    this._buildForm();
  }

  private _setFormChecklist() {
    if (!this.isEdit) {
      // If creating a new checklist, create new
      // FormChecklistModel with default null data
      return new FormChecklistModel(null, null, null, null, null, null, null);
    } else {
      // If editing existing checklist, create new
      // FormChecklistModel from existing data
      // Transform datetimes:
      // https://angular.io/api/common/DatePipe
      // _shortDate: 1/7/2017
      // 'shortTime': 12:05 PM
      const _shortDate = 'M/d/yyyy';
      return new FormChecklistModel(
        this.checklist.title,
        this.checklist.location,
        this.datePipe.transform(this.checklist.startDatetime, _shortDate),
        this.datePipe.transform(this.checklist.startDatetime, 'shortTime'),
        this.datePipe.transform(this.checklist.endDatetime, _shortDate),
        this.datePipe.transform(this.checklist.endDatetime, 'shortTime'),
        this.checklist.viewPublic,
        this.checklist.description
      );
    }
  }

  private _buildForm() {
    this.checklistForm = this.fb.group({
      title: [this.formChecklist.title, [
        Validators.required,
        Validators.minLength(this.ef.textMin),
        Validators.maxLength(this.ef.titleMax)
      ]],
      location: [this.formChecklist.location, [
        Validators.required,
        Validators.minLength(this.ef.textMin),
        Validators.maxLength(this.ef.locMax)
      ]],
      viewPublic: [this.formChecklist.viewPublic,
        Validators.required
      ],
      description: [this.formChecklist.description,
        Validators.maxLength(this.ef.descMax)
      ],
      datesGroup: this.fb.group({
        startDate: [this.formChecklist.startDate, [
          Validators.required,
          Validators.maxLength(this.ef.dateMax),
          Validators.pattern(DATE_REGEX),
          dateValidator()
        ]],
        startTime: [this.formChecklist.startTime, [
          Validators.required,
          Validators.maxLength(this.ef.timeMax),
          Validators.pattern(TIME_REGEX)
        ]],
        endDate: [this.formChecklist.endDate, [
          Validators.required,
          Validators.maxLength(this.ef.dateMax),
          Validators.pattern(DATE_REGEX),
          dateValidator()
        ]],
        endTime: [this.formChecklist.endTime, [
          Validators.required,
          Validators.maxLength(this.ef.timeMax),
          Validators.pattern(TIME_REGEX)
        ]]
      }, { validator: dateRangeValidator })
    });
    // Set local property to checklistForm datesGroup control
    this.datesGroup = this.checklistForm.get('datesGroup');

    // Subscribe to form value changes
    this.formChangeSub = this.checklistForm
      .valueChanges
      .subscribe(data => this._onValueChanged());

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an checklist that is no
    // longer valid (for example, an checklist in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.checklistForm);
      _markDirty(this.datesGroup);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.checklistForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.ef.validationMessages[field];
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
        if (field !== 'datesGroup') {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = '';
          _setErrMsgs(this.checklistForm.get(field), this.formErrors, field);
        } else {
          // Set errors for fields inside datesGroup
          const datesGroupErrors = this.formErrors['datesGroup'];
          for (const dateField in datesGroupErrors) {
            if (datesGroupErrors.hasOwnProperty(dateField)) {
              // Clear previous error message (if any)
              datesGroupErrors[dateField] = '';
              _setErrMsgs(this.datesGroup.get(dateField), datesGroupErrors, dateField);
            }
          }
        }
      }
    }
  }

  private _getSubmitObj() {
    const startDate = this.datesGroup.get('startDate').value;
    const startTime = this.datesGroup.get('startTime').value;
    const endDate = this.datesGroup.get('endDate').value;
    const endTime = this.datesGroup.get('endTime').value;
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new ChecklistModel for submission
    return new ChecklistModel(
      this.checklistForm.get('title').value,
      this.checklistForm.get('location').value,
      stringsToDate(startDate, startTime),
      stringsToDate(endDate, endTime),
      this.checklistForm.get('viewPublic').value,
      this.checklistForm.get('description').value,
      this.checklist ? this.checklist._id : null
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitChecklistObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitChecklistSub = this.checklistService
        .postChecklist$(this.submitChecklistObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitChecklistSub = this.checklistService
        .editChecklist$(this.checklist._id, this.submitChecklistObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to checklist detail
    this.router.navigate(['/checklist', res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.checklistForm.reset();
  }

  ngOnDestroy() {
    if (this.submitChecklistSub) {
      this.submitChecklistSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }

}