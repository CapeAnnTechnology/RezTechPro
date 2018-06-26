import { Routes, RouterModule } from '@angular/router';
import { BusinessComponent } from './business';
import { FormComponent, FormAddComponent } from './form';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { VenueComponent, VenueDetailComponent } from './venue';
import { UserComponent, UserAddComponent } from './user';
import { AuthGuard, AdminGuard } from './_guards';
import { CallbackComponent } from './callback';
import { ChecklistComponent } from './checklist';
import { LogComponent } from './log';

import { MyRsvpsComponent } from './my-rsvps/my-rsvps.component';


const appRoutes: Routes = [
 { path: '', component: HomeComponent }, // , canActivate: [AuthGuard]
 { path: 'callback', component: CallbackComponent },
 { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'businesses', component: BusinessComponent }, // , canActivate: [AuthGuard]
 { path: 'forms', component: FormComponent }, // , canActivate: [AuthGuard]
 { path: 'form/add', component: FormAddComponent }, // , canActivate: [AuthGuard]
 { path: 'venues', component: VenueComponent }, // , canActivate: [AuthGuard]
 { path: 'venue/:id', component: VenueDetailComponent }, // , canActivate: [AuthGuard]
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
    component: BusinessComponent,
    canActivate: [
      AuthGuard,
      AdminGuard
    ]
  },
  {
    path: 'checklist/:id',
    component: ChecklistComponent,
    canActivate: [
      AuthGuard
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
