import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import {} from 'jasmine';
import { DebugElement } from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,ReactiveFormsModule,HttpClientModule
      ],
      declarations: [ RegisterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
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
    
      it('register form should be invalid', async(() => {
       component.registerForm.controls['inputUserName'].setValue('');
       component.registerForm.controls['inputPassword'].setValue('');
       component.registerForm.controls['inputConfirmPassword'].setValue('');
       component.registerForm.controls['inputEmail'].setValue('');
       expect(component.registerForm.valid).toBeFalsy();
      }));
    
      it('register form should be valid', async(() => {
        component.registerForm.controls['inputUserName'].setValue('testuser');
        component.registerForm.controls['inputPassword'].setValue('testpassword');
        component.registerForm.controls['inputConfirmPassword'].setValue('testpassword');
        component.registerForm.controls['inputEmail'].setValue('testemail@test.com');
        expect(component.registerForm.valid).toBeTruthy();
       }));
});
