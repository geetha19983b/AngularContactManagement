import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { Subject } from 'rxjs/internal/Subject';
import { AppPaths } from '../../routing/constants/app-paths.const';
import { RequestService } from '../request/request.service';
import { AuthConsts } from './auth.consts';
import { AuthorizationData } from './auth.i';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  loggedIn: boolean;
  $loginSucceeded: Observable<AuthorizationData>;
  $logoutCompleted: Observable<any>;
  refreshSessionInterval: number;
  isRestoringTransactions = false;

  get authData(): AuthorizationData {
    return {
      sessionId: sessionStorage.getItem(AuthConsts.SESSION_ID_KEY)
    };
  }

  private loginSucceededSource = new Subject<AuthorizationData>();
  private logoutCompletedSource = new Subject<any>();
  private routeUrlBeforeLoggedOut: string;

  constructor(
    private requestService: RequestService,
    private router: Router
  ) {
    this.initParams();
  }

  ngOnDestroy(): void {
    
  }

  /**
   * TODO: Make 1 authorization localStorage object instead of many
   * TODO: Create timer for auth token expired
   */
  login(authData: AuthorizationData) {
    /** Simple data check -- might need to add service call to verify integrity of data */
    if (!authData) { return undefined; }
    if (!this.verifyData(authData)) { return undefined; }

    this.loggedIn = true;

    sessionStorage.setItem(
      AuthConsts.SESSION_ID_KEY,
      `${authData.sessionId}`
    );

    this.loginSucceededSource.next(authData);
    this.handleReRouteOnLogin();
  }

  logout(logoutMessage?: string) {
    this.loggedIn = false;
    sessionStorage.clear();
    
    this.logoutCompletedSource.next();
  }

  checkAuthorization() {
    return this.verifyData(this.authData);
  }

    
  /** Verifies that all data members have values */
  private verifyData(authData: AuthorizationData): boolean {
    let verified = true;

    Object.entries(authData)
      .forEach(([key, value]) => {
        if (!value) {
          verified = false;
        }
      });

    return verified;
  }

  private handleReRouteOnLogin() {
    if (this.routeUrlBeforeLoggedOut &&
      !this.routeUrlBeforeLoggedOut.includes(AppPaths.LOGIN.PATH) &&
      (this.routeUrlBeforeLoggedOut !== '/')) {
      this.router.navigateByUrl(this.routeUrlBeforeLoggedOut);
    } else {
      this.router.navigateByUrl(AppPaths.USER_CONTACT_LIST.ROUTE);
    }
  }

  private initParams() {
    this.loggedIn = false;

    /** Initialize event emitters */
    this.$loginSucceeded = this.loginSucceededSource.asObservable();
    this.$logoutCompleted = this.logoutCompletedSource.asObservable();
  }
}
