import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,private authServ: AuthenticationService) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){

    const loggedInUser = this.authServ.loggedInUserValue;

    if(loggedInUser){
      return true;
    }


    this.router.navigate(['/login'],{queryParams: {successUrl: state.url}});

    return false;

  }
}
