import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Venue } from '../_models/venue';

import { MessageService } from './message.service';

import { environment } from '../../environments/environment';

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
    ) { }

  /** GET venues from the server */
  getVenues (): Observable<Venue[]> {
    const url = `${this.apiUrl}/venues/20`;
    return this.http.get<Venue[]>(url)
      .pipe(
        tap(venues => this.log(`fetched venues`)),
        catchError(this.handleError('getVenues', []))
      );
  }

  /** GET venue by id. Return `undefined` when id not found */
  getVenueNo404<Data>(id: number): Observable<Venue> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<Venue[]>(url)
      .pipe(
        map(venues => venues[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} venue id=${id}`);
        }),
        catchError(this.handleError<Venue>(`getVenue id=${id}`))
      );
  }

  /** GET venue by id. Will 404 if id not found */
  getVenue(id: number): Observable<Venue> {
    const url = `${this.apiUrl}/venue/${id}`;
    return this.http.get<Venue>(url).pipe(
      tap(_ => this.log(`fetched venue id=${id}`)),
      catchError(this.handleError<Venue>(`getVenue id=${id}`))
    );
  }

  /* GET venues whose name contains search term */
  searchVenues(term: string): Observable<Venue[]> {
    if (!term.trim()) {
      // if not search term, return empty venue array.
      return of([]);
    }
    return this.http.get<Venue[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found venues matching "${term}"`)),
      catchError(this.handleError<Venue[]>('searchVenues', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new venue to the server */
  addVenue (venue: Venue): Observable<Venue> {
    const url = `${this.apiUrl}/venue`;
    return this.http.post<Venue>(url, venue, httpOptions).pipe(
      tap((venue: Venue) => this.log(`added venue w/ id=${venue._id}`)),
      catchError(this.handleError<Venue>('addVenue'))
    );
  }

  /** DELETE: delete the venue from the server */
  deleteVenue (venue: Venue | number): Observable<Venue> {
    const id = typeof venue === 'number' ? venue : venue._id;
    const url = `${this.apiUrl}/venue/${id}`;
    return this.http.delete<Venue>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted venue id=${id}`)),
      catchError(this.handleError<Venue>('deleteVenue'))
    );
  }

  /** PUT: update the venue on the server */
  updateVenue (venue: Venue): Observable<any> {
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

  /** Log a VenueService message with the MessageService */
  private log(message: string) {
    this.messageService.add('VenueService: ' + message);
  }
}
