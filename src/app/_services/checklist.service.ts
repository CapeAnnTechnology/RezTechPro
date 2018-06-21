import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ChecklistModel } from '../_models';

@Injectable()
export class ChecklistService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  // GET list of public, future events
  getChecklists$(): Observable<ChecklistModel[]> {
    return this.http
      .get<ChecklistModel[]>(`${environment.BASE_API}checklists`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET all events - private and public (admin only)
  getAdminChecklists$(): Observable<ChecklistModel[]> {
    return this.http
      .get<ChecklistModel[]>(`${environment.BASE_API}checklists/admin`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET an event by ID (login required)
  getChecklistById$(id: string): Observable<ChecklistModel> {
    return this.http
      .get<ChecklistModel>(`${environment.BASE_API}checklist/${id}`, {
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