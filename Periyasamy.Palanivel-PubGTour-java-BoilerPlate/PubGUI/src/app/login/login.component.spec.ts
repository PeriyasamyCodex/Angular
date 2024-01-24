import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { } from 'jasmine';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,ReactiveFormsModule,HttpClientModule
      ],
      declarations: [ LoginComponent ],      
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css("form"));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', async(() => {
component.OnSubmit();
expect(component.submitted).toBeTruthy();
  }));

  it('should call the onSubmit method', async(() => {
    fixture.detectChanges();
    spyOn(component,'OnSubmit');
    el = fixture.debugElement.query(By.css("button")).nativeElement;
    el.click();
    component.OnSubmit();
    expect(component.OnSubmit).toHaveBeenCalledTimes(1);
  }));

  it('login form should be invalid', async(() => {
   component.loginForm.controls['userName'].setValue('');
   component.loginForm.controls['password'].setValue('');
   expect(component.loginForm.valid).toBeFalsy();
  }));

  it('login form should be valid', async(() => {
    component.loginForm.controls['userName'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpassword');
    expect(component.loginForm.valid).toBeTruthy();
   }));


});
