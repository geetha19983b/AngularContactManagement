import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { AppPaths } from '../constants/app-paths.const';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  returnUrl: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * This route can only be accessed if the agent is not already authenticated
   * if the agent is authenticated and try to access the login route then they
   * will be redirect to travel-search => pnr-search
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    this.returnUrl = AppPaths.BASIC_SEARCH.ROUTE;
    if (this.authService.checkAuthorization()) { 
      this.router.navigateByUrl(this.returnUrl);
    }
    return of(true);
  }
}
