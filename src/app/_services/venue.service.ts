import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError as ObservableThrowError, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ChecklistModel, VenueModel } from '../_models';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  private apiUrl = environment.API_URI;  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private auth: AuthService,
    ) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  /** GET venues from the server */
  getVenues (): Observable<VenueModel[]> {
    const url = `${this.apiUrl}/venues/20`;
    return this.http.get<VenueModel[]>(url)
      .pipe(
        tap(venues => this.log(`fetched venues`)),
        catchError(this.handleError('getVenues', []))
      );
  }

  /** GET venue by id. Return `undefined` when id not found */
  getVenueNo404<Data>(id: number): Observable<VenueModel> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<VenueModel[]>(url)
      .pipe(
        map(venues => venues[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} venue id=${id}`);
        }),
        catchError(this.handleError<VenueModel>(`getVenue id=${id}`))
      );
  }

  /** GET venue by id. Will 404 if id not found */
  getVenue(id: number): Observable<VenueModel> {
    const url = `${this.apiUrl}/venue/${id}`;
    return this.http.get<VenueModel>(url).pipe(
      tap(_ => this.log(`fetched venue id=${id}`)),
      catchError(this.handleError<VenueModel>(`getVenue id=${id}`))
    );
  }

  // GET an venue by ID (login required)
  getVenueById$(id: string): Observable<VenueModel> {
    return this.http
      .get<VenueModel>(`${environment.BASE_API}venue/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  /* GET venues whose name contains search term */
  searchVenues(term: string): Observable<VenueModel[]> {
    if (!term.trim()) {
      // if not search term, return empty venue array.
      return of([]);
    }
    return this.http.get<VenueModel[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found venues matching "${term}"`)),
      catchError(this.handleError<VenueModel[]>('searchVenues', []))
    );
  }

    // GET RSVPs by business ID (login required)
  getChecklistsByVenueId$(venueId: string): Observable<ChecklistModel[]> {
    return this.http
      .get<ChecklistModel[]>(`${environment.BASE_API}venue/${venueId}/checklists`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  //////// Save methods //////////

  /** POST: add a new venue to the server */
  addVenue (venue: VenueModel): Observable<VenueModel> {
    const url = `${this.apiUrl}/venue`;
    return this.http.post<VenueModel>(url, venue, httpOptions).pipe(
      tap((venue: VenueModel) => this.log(`added venue w/ id=${venue._id}`)),
      catchError(this.handleError<VenueModel>('addVenue'))
    );
  }

  /** DELETE: delete the venue from the server */
  deleteVenue (venue: VenueModel | number): Observable<VenueModel> {
    const id = typeof venue === 'number' ? venue : venue._id;
    const url = `${this.apiUrl}/venue/${id}`;
    return this.http.delete<VenueModel>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted venue id=${id}`)),
      catchError(this.handleError<VenueModel>('deleteVenue'))
    );
  }

  /** PUT: update the venue on the server */
  updateVenue (venue: VenueModel): Observable<any> {
    const url = `${this.apiUrl}/venue/`;
    return this.http.put(url, venue, httpOptions).pipe(
      tap(_ => this.log(`updated venue id=${venue._id}`)),
      catchError(this.handleError<any>('updateVenue'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for venue consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return ObservableThrowError(errorMsg);
  }

  /** Log a VenueService message with the MessageService */
  private log(message: string) {
    this.messageService.add('VenueService: ' + message);
  }
}
