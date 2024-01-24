import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authRequest: any = {};
  successUrl: string;
  errorMessage: string;
  submitted: boolean = false;
  registerStatus: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authServ: AuthenticationService) {

    this.loginForm = this.formBuilder.group({
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    })


  }



  ngOnInit() {

    //to set access url on success authentication
    this.successUrl = this.route.snapshot.queryParams['successUrl'] || '/';
    this.registerStatus = this.route.snapshot.queryParams['registerStatus'];

  }



  OnSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    this.authRequest.userName = this.loginForm.get('userName').value;
    this.authRequest.passWord = this.loginForm.get('password').value;
    //authenticate user
    this.authServ.login(this.authRequest).subscribe(data => {

      console.log('Logged In User -> ' + JSON.stringify(this.authServ.loggedInUserValue));

      this.router.navigate([this.successUrl]);

    }, error => {

      console.log('Error from Server ->' + error);
      this.errorMessage = error;

    });

  }

  /**
   * to reset component parameters before submit
   */
  reserBeforeSubmit() {
    this.authRequest = {};
    this.submitted = false;
    this.errorMessage = null;

  }

}
