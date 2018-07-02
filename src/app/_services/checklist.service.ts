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

  // GET list of public, future checklists
  getChecklists$(): Observable<ChecklistModel[]> {
    return this.http
      .get<ChecklistModel[]>(`${environment.BASE_API}checklists`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET all checklists - private and public (admin only)
  getAdminChecklists$(): Observable<ChecklistModel[]> {
    return this.http
      .get<ChecklistModel[]>(`${environment.BASE_API}checklists/admin`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET an checklist by ID (login required)
  getChecklistById$(id: string): Observable<ChecklistModel> {
    return this.http
      .get<ChecklistModel>(`${environment.BASE_API}checklist/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

    // POST new checklist (admin only)
  postChecklist$(checklist: ChecklistModel): Observable<ChecklistModel> {
    return this.http
      .post<ChecklistModel>(`${environment.BASE_API}checklist/new`, checklist, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing checklist (admin only)
  editChecklist$(id: string, checklist: ChecklistModel): Observable<ChecklistModel> {
    return this.http
      .put<ChecklistModel>(`${environment.BASE_API}checklist/${id}`, checklist, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // DELETE existing checklist (admin only)
  deleteChecklist$(id: string): Observable<any> {
    return this.http
      .delete(`${environment.BASE_API}checklist/${id}`, {
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
