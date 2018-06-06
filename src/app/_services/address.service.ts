import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Address } from '../_models/address';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addressesUrl = 'api/addresses';  // URL to web api

  constructor(private http: HttpClient,
    private messageService: MessageService,
    ) { }

  /** GET addresses from the server */
  getAddresses (): Observable<Address[]> {
    return this.http.get<Address[]>(this.addressesUrl)
      .pipe(
        tap(addresses => this.log(`fetched addresses`)),
        catchError(this.handleError('getAddresses', []))
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

      // TODO: better job of transforming error for address consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a AddressService message with the MessageService */
  private log(message: string) {
    this.messageService.addWithStyle('AddressService: ' + message, 'alert-success');
  } 

}
