import { HttpErrorResponse } from '@angular/common/http/src/response';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PubgUIErrorHandler {


    public handleError(error: HttpErrorResponse) {
        let errorMessage;
    
        if (error.error instanceof ErrorEvent) {
    
          console.log('An Error Occured', error.error.message);
          errorMessage = error.error.message;
        } else {
    
          console.error(`Backend returned code ${error.status},` + `body was: ${error.error}`)
    
          if (error.error) {
            try {
              errorMessage = JSON.parse(error.error).message;
          } catch (e) {
            errorMessage = error.error.message;
          }
            
           
          }
        }
        
    
        if (errorMessage) {
    
         
            return throwError(`Server Error: ${errorMessage}`);
    
        
         
          
        }else{
          return throwError('Something Bad happened; please try again later.');
        }
    
      }

      isJson(str):boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }



}