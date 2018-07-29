import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { InspectionModel } from '../_models';

@Injectable()

export class InspectionService {

	constructor(
		private http: HttpClient,
		private auth: AuthService
	) { }

	private get _authHeader(): string {
		return `Bearer ${this.auth.accessToken}`;
	}

  // GET list of public inspections
  getInspections$(): Observable<InspectionModel[]> {
    return this.http
      .get<InspectionModel[]>(`${environment.BASE_API}inspections`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET an inspection by ID (login required)
  getInspectionById$(id: string): Observable<InspectionModel> {
    return this.http
      .get<InspectionModel>(`${environment.BASE_API}inspection/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // POST new inspection (admin only)
  postInspection$(inspection: InspectionModel): Observable<InspectionModel> {
    return this.http
      .post<InspectionModel>(`${environment.BASE_API}inspection/new`, inspection, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing event (admin only)
  editInspection$(id: string, inspection: InspectionModel): Observable<InspectionModel> {
    return this.http
      .put<InspectionModel>(`${environment.BASE_API}inspection/${id}`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // DELETE existing event and all associated RSVPs (admin only)
  deleteEvent$(id: string): Observable<any> {
    return this.http
      .delete(`${environment.BASE_API}event/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return ObservableThrowError(errorMsg);
  }

}
