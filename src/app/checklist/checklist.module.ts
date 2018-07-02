import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CHECKLIST_ROUTES } from './../_routes';

import { CoreModule } from './../core/core.module';
import { ChecklistComponent } from './checklist.component';
import { ChecklistDetailComponent } from './checklist-detail/checklist-detail.component';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';
import { ChecklistFormComponent } from './checklist-form/checklist-form.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(CHECKLIST_ROUTES)
  ],
  declarations: [
    ChecklistComponent,
    ChecklistDetailComponent,
    CreateChecklistComponent,
    ChecklistFormComponent
  ]
})
export class ChecklistModule { }
