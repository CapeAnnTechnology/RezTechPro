import { Routes } from '@angular/router';
import { AdminComponent } from './../admin/admin.component';
import { CreateEventComponent } from './../admin/create-event/create-event.component';
import { UpdateEventComponent } from './../admin/update-event/update-event.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'event/new',
    component: CreateEventComponent
  },
  {
    path: 'event/update/:id',
    component: UpdateEventComponent
  }
];