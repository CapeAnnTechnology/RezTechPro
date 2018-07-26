import { Routes, RouterModule } from '@angular/router';
import { FormComponent, FormAddComponent } from './form';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
// import { VenueComponent, VenueDetailComponent } from './venue';
import { UserComponent, UserAddComponent } from './user';
import { AuthGuard, AdminGuard } from './_guards';
import { CallbackComponent } from './callback';
import { LogComponent } from './log';

import { MyRsvpsComponent } from './my-rsvps/my-rsvps.component';


const appRoutes: Routes = [
 { path: '', component: HomeComponent }, // , canActivate: [AuthGuard]
 { path: 'callback', component: CallbackComponent },
 { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent },
 //{ path: 'businesses', component: BusinessComponent }, // , canActivate: [AuthGuard]
 { path: 'forms', component: FormComponent }, // , canActivate: [AuthGuard]
 { path: 'form/add', component: FormAddComponent }, // , canActivate: [AuthGuard]
 // { path: 'venues', component: VenueComponent }, // , canActivate: [AuthGuard]
 // { path: 'venue/:id', component: VenueDetailComponent }, // , canActivate: [AuthGuard]
 { path: 'users', component: UserComponent }, // , canActivate: [AuthGuard]
 { path: 'user/add', component: UserAddComponent }, // , canActivate: [AuthGuard]
 {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [
      AuthGuard,
      AdminGuard
    ]
  },
  {
    path: 'logs',
    canActivate: [
      AuthGuard,
      AdminGuard
    ],
    children: [
      {
        path: '',
        component: LogComponent
      }
    ]
  },
  {
    path: 'event/:id',
    loadChildren: './event/event.module#EventModule',
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'business/:id',
    loadChildren: './business/business.module#BusinessModule',
    canActivate: [
      AuthGuard,
      AdminGuard
    ]
  },
  {
    path: 'venue/:id',
    loadChildren: './venue/venue.module#VenueModule',
    canActivate: [
      AuthGuard,
      AdminGuard
    ]
  },
  {
    path: 'inspection/:id',
    loadChildren: './inspection/inspection.module#InspectionModule',
    canActivate: [
      AuthGuard,
      AdminGuard
    ]
  },
  {
    path: 'checklist/:id',
    loadChildren: './checklist/checklist.module#ChecklistModule',
    canActivate: [
      AuthGuard,
      AdminGuard
    ]
  },
  {
    path: 'my-rsvps',
    component: MyRsvpsComponent,
    canActivate: [
      AuthGuard
    ]
  },
 // otherwise redirect to home
 { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
