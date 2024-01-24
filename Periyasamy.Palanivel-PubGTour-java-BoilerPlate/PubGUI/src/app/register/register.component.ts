import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserDataServiceService } from 'src/app/services/user-data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerUserRequest: any = {};
  submitted: boolean = false;
  isFormHasError: boolean = false;
  erroMessage: string;
  isRegisterSuccess: boolean = false;;

  constructor(private formBuilder: FormBuilder, private usrDataService: UserDataServiceService, private route: ActivatedRoute, private router: Router ) {
    this.registerForm = this.formBuilder.group({
      'inputUserName': ['', Validators.required],
      'inputPassword': ['', [Validators.required, Validators.minLength(6)]],
      'inputConfirmPassword': ['', [Validators.required, Validators.minLength(6)]],
      'inputEmail': ['', [Validators.required, Validators.email]]
    })

  }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
  }

  validateOnSubmit() {

    if (this.registerForm.get('inputPassword').value != this.registerForm.get('inputConfirmPassword').value) {
      this.erroMessage = "Error: Input Password & Confirm Password is Not Matching";
      this.isFormHasError = true;
      return false;
    } else {

      return true;
    }
  }

  OnSubmit() {
    this.reserBeforeSubmit();
    this.submitted = true;
    if (this.registerForm.invalid || !this.validateOnSubmit()) {
      return
    }

    //register user
    this.sendRegisterUserRequest();

  }

  reserBeforeSubmit() {
    this.submitted = false;
    this.isFormHasError = false;
    this.registerUserRequest = {};
    this.isRegisterSuccess = false;
    this.erroMessage = null;

  }

  sendRegisterUserRequest() {

    this.registerUserRequest.userName = this.registerForm.get('inputUserName').value;
    this.registerUserRequest.passWord = this.registerForm.get('inputPassword').value;
    this.registerUserRequest.email = this.registerForm.get('inputEmail').value;


    this.usrDataService.authenticateUser(this.registerUserRequest).subscribe(data => {

      console.log('Response from Server ->' + data);

      if (data == 'Success') {

        this.isRegisterSuccess = true;
        this.router.navigate(['/login'],{queryParams: {registerStatus:this.isRegisterSuccess }})

      }
    }, error => {

      console.log('Error from Server ->' + error);
      this.erroMessage = error;

    });
  }


}
