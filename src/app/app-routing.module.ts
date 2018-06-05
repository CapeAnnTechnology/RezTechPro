import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserDetailComponent }   from './user-detail/user-detail.component';
import { VenueDetailComponent }   from './venue-detail/venue-detail.component';

import { FormComponent }   from './form/form.component';
import { FormDetailComponent }   from './form-detail/form-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'venue/:id', component: VenueDetailComponent },
  { path: 'forms/venue/:id', component: FormComponent },
  { path: 'form/:id', component: FormDetailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]

})
export class AppRoutingModule {}