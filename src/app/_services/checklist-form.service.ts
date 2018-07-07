import { Injectable } from '@angular/core';

@Injectable()
export class ChecklistFormService {
  validationMessages: any;
  // Set up errors object
  formErrors = {
    title: '',
    location: '',
    viewPublic: '',
    description: '',
    datesGroup: {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    },
    quesiton1: '',
    quesiton2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question7Date: '',
    question8: '',
    question9: '',
    question9Person: '',
    question10: '',
    question10Person: '',
    question11: '',
    question11Capacity: '',
    question11Date: '',
  };
  // Min/maxlength validation
  textMin = 3;
  textMax = 300;
  titleMax = 36;
  locMax = 200;
  dateMax = 10;
  timeMax = 8;
  descMax = 2000;
  // Formats
  dateFormat = 'm/d/yyyy';
  timeFormat = 'h:mm AM/PM';

  constructor() {
    this.validationMessages = {
      title: {
        required: `Title is <strong>required</strong>.`,
        minlength: `Title must be ${this.textMin} characters or more.`,
        maxlength: `Title must be ${this.titleMax} characters or less.`
      },
      location: {
        required: `Location is <strong>required</strong>.`,
        minlength: `Location must be ${this.textMin} characters or more.`,
        maxlength: `Location must be ${this.locMax} characters or less.`
      },
      startDate: {
        required: `Start date is <strong>required</strong>.`,
        maxlength: `Start date cannot be longer than ${this.dateMax} characters.`,
        pattern: `Start date must be in the format <strong>${this.dateFormat}</strong>.`,
        date: `Start date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>.`
      },
      startTime: {
        required: `Start time is <strong>required</strong>.`,
        pattern: `Start time must be a <strong>valid time</strong> in the format <strong>${this.timeFormat}</strong>.`,
        maxlength: `Start time must be ${this.timeMax} characters or less.`
      },
      endDate: {
        required: `End date is <strong>required</strong>.`,
        maxlength: `End date cannot be longer than ${this.dateMax} characters.`,
        pattern: `End date must be in the format <strong>${this.dateFormat}</strong>.`,
        date: `End date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>.`
      },
      endTime: {
        required: `End time is <strong>required</strong>.`,
        pattern: `End time must be a <strong>valid time</strong> in the format <strong>${this.timeFormat}</strong>.`,
        maxlength: `End time must be ${this.timeMax} characters or less.`
      },
      viewPublic: {
        required: `You must specify whether this checklist should be publicly listed.`
      },
      description: {
        maxlength: `Description must be ${this.descMax} characters or less.`
      },
      question1: {
        required: `Question 1 is <strong>required</strong>.`,
      },
      question2: {
        required: `Question 2 is <strong>required</strong>.`,
      },
      question3: {
        required: `Question 3 is <strong>required</strong>.`,
      },
      question4: {
        required: `Question 4 is <strong>required</strong>.`,
      },
      question5: {
        required: `Question 5 is <strong>required</strong>.`,
      },
      question6: {
        required: `Question 6 is <strong>required</strong>.`,
      },
      question7: {
        required: `Question 7 is <strong>required</strong>.`,
      },
      question7Date: {
        required: `Inspection Date is <strong>required</strong>.`,
        maxlength: `Inspection Date cannot be longer than ${this.dateMax} characters.`,
        pattern: `Inspection Date must be in the format <strong>${this.dateFormat}</strong>.`,
        date: `Inspection Date must be a <strong>valid date</strong> <strong>in the past</strong>.`
      },
      question8: {
        required: `Question 8 is <strong>required</strong>.`,
      },
      question9: {
        required: `Question 9 is <strong>required</strong>.`,
      },
      question9Person: {
        required: `Person is <strong>required</strong>.`,
        minlength: `Person must be ${this.textMin} characters or more.`,
        maxlength: `Person cannot be longer than ${this.textMax} characters.`,
      },
      question10: {
        required: `Question 10 is <strong>required</strong>.`,
      },
      question10Person: {
        required: `Person is <strong>required</strong>.`,
        minlength: `Person must be ${this.textMin} characters or more.`,
        maxlength: `Person cannot be longer than ${this.textMax} characters.`,
      },
      question11: {
        required: `Question 11 is <strong>required</strong>.`,
      },
      question11Capacity: {
        required: `Capacity is <strong>required</strong>.`,
        minlength: `Capacity must be ${this.textMin} characters or more.`,
        maxlength: `Capacity cannot be longer than ${this.textMax} characters.`,
      },
      question11Date: {
        required: `Expiration Date is <strong>required</strong>.`,
        maxlength: `Expiration Date cannot be longer than ${this.dateMax} characters.`,
        pattern: `Expiration Date must be in the format <strong>${this.dateFormat}</strong>.`,
        date: `Expiration Date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>.`
      },
    };
  }

}