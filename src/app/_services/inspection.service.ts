import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { InspectionModel } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

	constructor(
		private http: HttpClient,
		private auth: AuthService
	) { }

	private get _authHeader(): string {
		return `Bearer ${this.auth.accessToken}`;
	}

	

}
