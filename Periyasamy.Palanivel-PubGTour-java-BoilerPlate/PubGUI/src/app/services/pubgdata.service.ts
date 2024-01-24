import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { PubgUIErrorHandler } from 'src/app/shared/error-handler';
const headers = new HttpHeaders({
  'Accept': 'application/vnd.api+json',
  'XmlHttpRequestDestination' : 'EXTPUBG'
  
  
  });


@Injectable({
  providedIn: 'root'
})
export class PubgdataService {

  constructor(private http: HttpClient,private errorHandler:PubgUIErrorHandler) { }


  getListOfPUBGTournaments(): Observable<any> {

    return this.http.get('https://api.pubg.com/tournaments', {headers})
      .pipe(
      catchError(this.errorHandler.handleError)
      
      );

  }

  getTournamentMatchList(tournId:string): Observable<any> {

    return this.http.get('https://api.pubg.com/tournaments/'+tournId, {headers})
      .pipe(
      catchError(this.errorHandler.handleError)
      //catch error
      );

  }

  getTournamentMatchDetails(matchId:string): Observable<any> {

    const headers = new HttpHeaders({
      'Accept': 'application/vnd.api+json'      
      });
  

    return this.http.get('https://api.pubg.com/shards/tournament/matches/'+matchId, {headers})
      .pipe(
      catchError(this.errorHandler.handleError)
      //catch error
      );
  }

}
