import { Routes } from '@angular/router';
import { ChecklistComponent, CreateChecklistComponent } from './../checklist';

export const CHECKLIST_ROUTES: Routes = [
  {
    path: '',
    component: ChecklistComponent
  },
  {
    path: 'new',
    component: CreateChecklistComponent
  }
];