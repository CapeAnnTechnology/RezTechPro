import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_models';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';

const httpOptions = {
 headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
 providedIn: 'root'
})

export class UserService {
constructor(private http: HttpClient,
            private messageService: MessageService,
            ) { }

 private apiUrl = environment.API_URI;

 /** GET users from the server */
 getAll (): Observable<User[]> {
     const url = `${this.apiUrl}/users/20/`;
     return this.http.get<User[]>(url)
       .pipe(
         tap( users => this.log( `fetched users` ) ),
         catchError( this.handleError( 'getUsers', [] ) )
       );
 }

 /** GET users from the server */
 getUsers ( count: number ): Observable<User[]> {
     const url = `${this.apiUrl}/users/` + count + `/`;
     return this.http.get<User[]>(url)
       .pipe(
         tap( users => this.log( `fetched users` ) ),
         catchError(this.handleError('getUsers', [] ) )
       );
 }

 getById( id: number ) {
     return this.http.get( '/api/users/' + id );
 }

 create( user: User ) {
     return this.http.post( '/api/users', user );
 }

 update( user: User ) {
     return this.http.put( '/api/users/' + user.id, user );
 }

 delete( id: number ) {
     return this.http.delete( '/api/users/' + id );
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
     this.messageService.add('UserService: ' + message);
 }
}
