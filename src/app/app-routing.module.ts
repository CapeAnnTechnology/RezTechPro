import { Routes, RouterModule } from '@angular/router';
import { BusinessComponent } from './business';
import { FormComponent, FormAddComponent } from './form';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { VenueComponent, VenueDetailComponent } from './venue';
import { UserComponent, UserAddComponent } from './user';
import { AuthGuard } from './_guards';
import { CallbackComponent } from './callback';


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
 // otherwise redirect to home
 { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
