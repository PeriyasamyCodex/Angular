import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {  PubgUIErrorHandler } from 'src/app/shared/error-handler';

const headers = new HttpHeaders({
'Content-Type': 'application/json',
'XmlHttpRequestDestination' : 'INTRNLPUBG'


});



@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  constructor(private http: HttpClient,private errorHandler:PubgUIErrorHandler) { }

  authenticateUser(userDetails: any): Observable<any> {

    return this.http.post('http://localhost:8082/registerUser', userDetails,{headers,
    responseType: 'text'})
      .pipe(
      catchError(this.errorHandler.handleError)
      //catch error
      );

  }


}
