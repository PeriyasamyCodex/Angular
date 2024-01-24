import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent } from '@angular/common/http/src/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authServ: AuthenticationService) { }

/**
 * Interceptor to intercept all http request to validate user & set auth token on every request
 * @param req 
 * @param next 
 */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
console.log('JWT Interceptor'+req.headers.get("XmlHttpRequestDestination"));



    let loggedInUser = this.authServ.loggedInUserValue;
   // console.log('JWT Interceptor - Token '+loggedInUser.authJwtToken);

    if (loggedInUser && req.headers.get("XmlHttpRequestDestination") == "EXTPUBG") {

     
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${environment.expPUBGAPIKEY}`
        },
         headers: req.headers.delete('XmlHttpRequestDestination','EXTPUBG')

      });

    }else if(loggedInUser && req.headers.get("XmlHttpRequestDestination") == "INTRNLPUBG" && loggedInUser.authJwtToken){

     
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedInUser.authJwtToken}`
        },
        headers: req.headers.delete('XmlHttpRequestDestination','INTRNLPUBG')

      });

    }

    return next.handle(req);
  }


}
