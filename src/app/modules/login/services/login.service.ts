import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginRequest } from '../../../core/services/request/interfaces/login/login-request.i';
import { RequestService } from '../../../core/services/request/request.service';
import { LoginFormData } from '../login-form/interfaces/login-form.i';

@Injectable()
export class LoginService {

  constructor(
    private requestService: RequestService,
    private authService: AuthService
  ) { }

  /**
   * Inherit type from return of requestService login
   * Returns access token
   */
  login(body: LoginFormData) {
    return this.requestService
      .login(
        this.formatRequest(body)
      )
      .pipe(
        tap(response => {
          this.requestService.sessionId = response.sessionID;

          this.authService.login({
            sessionId: this.requestService.sessionId
          });
        })
      );
  }

  private formatRequest(loginForm: LoginFormData): LoginRequest {
    return {
      userId: loginForm.userId,
      password: loginForm.password
    };
  }
}
