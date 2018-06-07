import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { VenueComponent } from './venue';
import { UserComponent, UserAddComponent } from './user';

import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'venues', component: VenueComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'user/add', component: UserAddComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);