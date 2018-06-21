import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // process.env.SSO_URI
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

        // this.router.navigate([environment.SSO_URI],
        // { queryParams: { returnUrl: state.url }});
        // window.location.href=environment.SSO_URI;
        // window.location.href=environment.SSO_URI+'?returnUrl='+window.location;

        return false;
    }
}
