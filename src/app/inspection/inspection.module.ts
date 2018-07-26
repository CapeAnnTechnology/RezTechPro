import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { INSPECTION_ROUTES } from './../_routes';

import { CoreModule } from './../core/core.module';
import { InspectionComponent } from './inspection.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionNewComponent } from './inspection-new/inspection-new.component';
import { InspectionFormComponent } from './inspection-form/inspection-form.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(INSPECTION_ROUTES)
  ],
  declarations: [
  	InspectionComponent,
  	InspectionDetailComponent,
  	InspectionNewComponent,
  	InspectionFormComponent]
})
export class InspectionModule { }
