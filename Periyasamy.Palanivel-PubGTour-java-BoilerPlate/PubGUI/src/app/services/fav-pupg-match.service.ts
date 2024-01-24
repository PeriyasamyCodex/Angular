import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { PubgUIErrorHandler } from 'src/app/shared/error-handler';

const headers = new HttpHeaders({
'XmlHttpRequestDestination' : 'INTRNLPUBG',
'Accept' : '*/*'
  });

@Injectable({
  providedIn: 'root'
})
export class FavPupgMatchService {

  constructor(private http: HttpClient,private errorHandler:PubgUIErrorHandler) { }


  addToFavourite(favMatchRequest:any): Observable<any> {
    return this.http.post<any>('http://localhost:8082/service/addToFav', favMatchRequest,{headers})
      .pipe(catchError(this.errorHandler.handleError));


  }
  removeFromFavourite(delMatchId:string): Observable<any> {
    return this.http.delete<any>('http://localhost:8082/service/deleteFavMatch/'+delMatchId,{headers})
      .pipe(catchError(this.errorHandler.handleError));


  }
  getAllFavMatches(userName:string){

    return this.http.get<any>('http://localhost:8082/service/getAllFavMatchForUser/'+userName,{headers})
    .pipe(catchError(this.errorHandler.handleError));
  }


}
