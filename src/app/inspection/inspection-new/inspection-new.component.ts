import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inspection-new',
  templateUrl: './inspection-new.component.html',
  styleUrls: ['./inspection-new.component.scss']
})
export class InspectionNewComponent implements OnInit {

  pageTitle = 'New Inspection';

  constructor(private title: Title) { }

  ngOnInit() {
  	this.title.setTitle(this.pageTitle);
  }

}
