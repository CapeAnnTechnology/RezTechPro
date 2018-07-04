import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { AuthService,ChecklistService, ChecklistFormService } from './../../_services';
import { ChecklistModel, FormChecklistModel } from './../../_models';
import { dateValidator, dateRangeValidator } from './../../_validators';
import { DATE_REGEX, TIME_REGEX, stringsToDate } from './../../_factories';

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
  venueId: string;
  userId: string;
  routeSub: Subscription;


  constructor(
    private fb: FormBuilder,
    private checklistService: ChecklistService,
    private datePipe: DatePipe,
    public cf: ChecklistFormService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => {
        // this.loading = true;
        if (loggedIn) {
          // this._routeSubs();
          // console.log(this.auth.userProfile);
          this.routeSub = this.route.params
          .subscribe(params => {
            this.id = params['id'];
            this.venueId = params['id'];
            this.userId = this.auth.userProfile.sub.split('|')[1];
            // console.log(this.venueId);
            this.formErrors = this.cf.formErrors;
            this.isEdit = !!this.checklist;
            this.submitBtnText = this.isEdit ? 'Update Checklist' : 'Create Checklist';
            // Set initial form data
            this.formChecklist = this._setFormChecklist();
            // Use FormBuilder to construct the form
            this._buildForm();
          });
        }
      }
    );
  }

  private _setFormChecklist() {
    if (!this.isEdit) {
      // If creating a new checklist, create new
      // FormChecklistModel with default null data
      return new FormChecklistModel(this.userId, this.venueId, null, null, null, null);
    } else {
      // If editing existing checklist, create new
      // FormChecklistModel from existing data
      // Transform datetimes:
      // https://angular.io/api/common/DatePipe
      // _shortDate: 1/7/2017
      // 'shortTime': 12:05 PM
      const _shortDate = 'M/d/yyyy';
      return new FormChecklistModel(
        this.checklist.userId,
        this.checklist.venueId,
        // this.checklist.title,
        this.checklist.location,
        this.checklist.question1,
        this.checklist.question2,
        this.checklist.question3,
        this.checklist.question4,
        this.checklist.question5,
        this.checklist.question6,
        this.checklist.question7,
        this.checklist.question7Date,
        this.checklist.question8,
        this.checklist.question9,
        this.checklist.question9Person,
        this.checklist.description,
        this.checklist.venueId,
        this.checklist.userId
      );
    }
  }

  private _buildForm() {
    this.checklistForm = this.fb.group({
      userId: [this.formChecklist.userId,
        Validators.required
      ],
      venueId: [this.formChecklist.venueId,
        Validators.required
      ],
      // title: [this.formChecklist.title, [
      //   Validators.required,
      //   Validators.minLength(this.cf.textMin),
      //   Validators.maxLength(this.cf.titleMax)
      // ]],
      location: [this.formChecklist.location, [
        Validators.required,
        Validators.minLength(this.cf.textMin),
        Validators.maxLength(this.cf.locMax)
      ]],
      question1: [this.formChecklist.question1,
        Validators.required
      ],
      question2: [this.formChecklist.question2,
        Validators.required
      ],
      question3: [this.formChecklist.question3,
        Validators.required
      ],
      question4: [this.formChecklist.question4,
        Validators.required
      ],
      question5: [this.formChecklist.question5,
        Validators.required
      ],
      question6: [this.formChecklist.question6,
        Validators.required
      ],
      question7: [this.formChecklist.question7,
        Validators.required
      ],
      question7Date: [this.formChecklist.question7Date,
        Validators.required
      ],
      question8: [this.formChecklist.question8,
        Validators.required
      ],
      question9: [this.formChecklist.question9,
        Validators.required
      ],
      question9Person: [this.formChecklist.question9Person,
        Validators.required
      ],
      description: [this.formChecklist.description,
        Validators.maxLength(this.cf.descMax)
      ],
    });
    // Set local property to checklistForm datesGroup control
    // this.datesGroup = this.checklistForm.get('datesGroup');

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
        const messages = this.cf.validationMessages[field];
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
          // // Set errors for fields inside datesGroup
          // const datesGroupErrors = this.formErrors['datesGroup'];
          // for (const dateField in datesGroupErrors) {
          //   if (datesGroupErrors.hasOwnProperty(dateField)) {
          //     // Clear previous error message (if any)
          //     datesGroupErrors[dateField] = '';
          //     _setErrMsgs(this.datesGroup.get(dateField), datesGroupErrors, dateField);
          //   }
          // }
        }
      }
    }
  }

  private _getSubmitObj() {
    return new ChecklistModel(
      this.checklistForm.get('userId').value,
      this.checklistForm.get('venueId').value,
      // this.checklistForm.get('title').value,
      this.checklistForm.get('location').value,
      this.checklistForm.get('question1').value,
      this.checklistForm.get('question2').value,
      this.checklistForm.get('question3').value,
      this.checklistForm.get('question4').value,
      this.checklistForm.get('question5').value,
      this.checklistForm.get('question6').value,
      this.checklistForm.get('question7').value,
      this.checklistForm.get('question7Date').value,
      this.checklistForm.get('question8').value,
      this.checklistForm.get('question9').value,
      this.checklistForm.get('question9Person').value,
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