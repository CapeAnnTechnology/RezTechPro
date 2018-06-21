import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { Form } from '../_models/form';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formsUrl = 'api/forms';  // URL to web api

  constructor(private http: HttpClient,
    private messageService: MessageService
    ) { }

  /** GET forms from the server */
  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.formsUrl)
      .pipe(
        tap(forms => this.log(`fetched forms`)),
        catchError(this.handleError('getForms', []))
      );
  }

  /** GET form by id. Return `undefined` when id not found */
  getFormNo404<Data>(id: number): Observable<Form> {
    const url = `${this.formsUrl}/?id=${id}`;
    return this.http.get<Form[]>(url)
      .pipe(
        map(Forms => Forms[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Form id=${id}`);
        }),
        catchError(this.handleError<Form>(`getForm id=${id}`))
      );
  }

  /** GET Form by id. Will 404 if id not found */
  getForm(id: number): Observable<Form> {
    const url = `${this.formsUrl}/${id}`;
    return this.http.get<Form>(url).pipe(
      tap(_ => this.log(`fetched Form id=${id}`)),
      catchError(this.handleError<Form>(`getForm id=${id}`))
    );
  }

  /* GET Forms whose name contains search term */
  searchForms(term: string): Observable<Form[]> {
    if (!term.trim()) {
      // if not search term, return empty Form array.
      return of([]);
    }
    return this.http.get<Form[]>(`${this.formsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found Forms matching "${term}"`)),
      catchError(this.handleError<Form[]>('searchForms', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Form to the server */
  addForm ( Form: Form ): Observable<Form> {
    return this.http.post<Form>( this.formsUrl, Form, httpOptions ).pipe(
      tap( ( Form: Form ) => this.log( `added Form w/ id=${Form.id}` ) ),
      catchError( this.handleError<Form>('addForm') )
    );
  }

  /** DELETE: delete the Form from the server */
  deleteForm (Form: Form | number): Observable<Form> {
    const id = typeof Form === 'number' ? Form : Form.id;
    const url = `${this.formsUrl}/${id}`;

    return this.http.delete<Form>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Form id=${id}`)),
      catchError(this.handleError<Form>('deleteForm'))
    );
  }

  /** PUT: update the Form on the server */
  updateForm (Form: Form): Observable<any> {
    return this.http.put(this.formsUrl, Form, httpOptions).pipe(
      tap(_ => this.log(`updated Form id=${Form.id}`)),
      catchError(this.handleError<any>('updateForm'))
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

      // TODO: better job of transforming error for Form consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a FormService message with the MessageService */
  private log(message: string) {
    this.messageService.add('FormService: ' + message);
  }
}
