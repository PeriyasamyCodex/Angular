import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { PubgUIErrorHandler } from 'src/app/shared/error-handler';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'XmlHttpRequestDestination' : 'INTRNLPUBG'
  
  
  });
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public loggedInUserSubject: BehaviorSubject<any>;
  public loggedInUser: Observable<any>;

  constructor(private http: HttpClient,private errorHandler:PubgUIErrorHandler) {
    this.loggedInUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('loggedInUser')));
    this.loggedInUser = this.loggedInUserSubject.asObservable();

  }

  public get loggedInUserValue() {
    return this.loggedInUserSubject.value;
  }


  login(authRequest:any): Observable<any> {
    return this.http.post<any>('http://localhost:8082/authenticate', authRequest,{headers})
      .pipe(map(any => {
        localStorage.setItem('loggedInUser', JSON.stringify(any));
        this.loggedInUserSubject.next(any);

        return any;

      }), catchError(this.errorHandler.handleError));


  }


  logout(){

    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
  }

}
