import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PubGUI';
  loggedInUser: any;

  constructor(private router: Router, private authServ: AuthenticationService) {

    this.authServ.loggedInUser.subscribe(usr => this.loggedInUser = usr);


  }

  logout() {
    this.authServ.logout();
    this.router.navigate(['login']);

  }
}
