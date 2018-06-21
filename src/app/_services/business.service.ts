import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Business } from '../_models';

import { MessageService } from './message.service';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor() { }
}
