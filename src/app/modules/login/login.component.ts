import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';
import { take } from 'rxjs/internal/operators/take';
import { AuthService } from '../../core/services/auth/auth.service';
import { LoginFormData } from './login-form/interfaces/login-form.i';
import { LoginService } from './services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppPaths } from '../../core/routing/constants/app-paths.const';
import { AuthConsts } from '../../core/services/auth/auth.consts';

@Component({
  selector: 'ual-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: LoginFormData;
  isAuthenticated: boolean;
  submitSearchSpinner: boolean;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.checkAuthorization();
    this.returnUrl = this.route.snapshot.queryParams[AuthConsts.RETURN_URL] 
    || AppPaths.USER_CONTACT_LIST.ROUTE;
  }


  onLoginFormSubmit(submitLoginEvent: LoginFormData) {
    this.submitSearchSpinner = true;

    this.loginService.login(submitLoginEvent)
      .pipe(
        take(1),
        finalize(() => {
         // this.submitSearchSpinner = false;
        }))
        .subscribe(loginResponse => {
          this.submitSearchSpinner = false;
        });
  }

}
