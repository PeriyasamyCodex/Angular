import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class PubgServiceMock {

    constructor() { }

    getListOfPUBGTournaments(): Observable<any> {

        let data:any = {"data":[{
            id:'tour1'
        },{
    
            id:'tour2'
        },{
    
            id:'tour3'
        }]};

        return of(data);
    
      }
    
       getTournamentMatchList(tournId:string): Observable<any> {

        let data:any = {"data": {relationships:{matches:{data:[{
            id:'match1'
        },{
    
            id:'match1'
        },{
    
            id:'match1'
        }]}}}};
    
        return of(data);
    
       }
    
      getTournamentMatchDetails(matchId:string): Observable<any> {
    
        let data:any = {"data": {attributes:{
            duration:'1182',
            mapName: 'erangel'

        }}};
    
        return of(data);
      }

}