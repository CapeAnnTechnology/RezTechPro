import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Form } from '../_models';
import { FormService } from '../_services';
import { Title } from '@angular/platform-browser';

@Component({
 selector: 'app-form',
 templateUrl: './form.component.html',
 styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

 forms: Form[] = [];
 title = 'Forms';

 constructor(private route: ActivatedRoute,
  private formService: FormService,
  private titleService: Title,
  private location: Location
 ) { }

 ngOnInit() {
  this.getForms();
  this.setTitle(this.title);
 }

 getForms(): void {
  this.formService.getForms()
   .subscribe(forms => this.forms = forms);
 }

 public setTitle( newTitle: string) {
  this.titleService.setTitle( newTitle );
 }

}
