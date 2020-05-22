import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormUtils } from '../../../common/forms/form-utils';
import { LoginFormConsts } from './constants/login-form.consts';
import { LoginFormData } from './interfaces/login-form.i';

@Component({
  selector: 'ual-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @ViewChild('userId') userId: ElementRef;
  @ViewChild('password') password: ElementRef;

  @Input() submitSearchSpinner = false;
  @Input() loginParams: LoginFormData;
  @Output() readonly submitLoginFormData = new EventEmitter<LoginFormData>();

  loginForm: FormGroupTyped<LoginFormData>;
  LOGIN_CONSTS = LoginFormConsts;

  constructor(private fb: FormBuilder, private elementRef: ElementRef) { }

  ngOnInit() {
    this.initParams();
    this.initSearchForm();
  }

  login(data: LoginFormData) {
    this.submitLoginFormData.emit(data);
  }

  clearValue(control) {
    FormUtils.clearValue(control);
  }

  focusNextField(event: { target: { id: any } }, maxLength: number) {
    const controls = this.loginForm.controls;

    switch (event.target.id) {
      case this.userId.nativeElement.id:
        if (
          this.userId.nativeElement.value &&
          this.userId.nativeElement.value.length >= maxLength
        ) {
          if (!controls.userId.valid) { break; }
          this.password.nativeElement.focus();
        }
        break;
      case this.password.nativeElement.id:
        if (
          this.password.nativeElement.value &&
          this.password.nativeElement.value.length >= maxLength
        ) {
          if (!controls.password.valid) { break; }
        }
        break;
      default:
        break;
    }
  }

  private initParams() {
    this.loginParams = this.loginParams || {
      userId: '',
      password: ''
    };
  }

  private initSearchForm() {
    this.loginForm = this.fb.group({
      userId: [
        this.loginParams.userId,
        this.LOGIN_CONSTS.USERID_VALIDATORS
      ],
      password: [
        this.loginParams.password,
        this.LOGIN_CONSTS.PASSWORD_VALIDATORS
      ]
    }) as FormGroupTyped<LoginFormData>;
  }
}
