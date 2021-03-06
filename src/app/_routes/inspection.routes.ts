import { Routes } from '@angular/router';
import { InspectionComponent, InspectionNewComponent } from './../inspection';

export const INSPECTION_ROUTES: Routes = [
  {
    path: '',
    component: InspectionComponent
  },
  {
    path: ':id',
    component: InspectionComponent
  },
  {
    path: ':id/new',
    component: InspectionNewComponent
  }
];