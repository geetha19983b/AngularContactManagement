import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { fadeInAnimation } from './common/animations/fade.animation';
import { Subject } from 'rxjs/internal/Subject';
import { Router, NavigationError, RouteConfigLoadStart, RouterEvent, RouteConfigLoadEnd, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from './core/services/auth/auth.service';
import { RequestService } from './core/services/request/request.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'ual-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav,{static:false}) sidenav: MatSidenav;
  title = 'StarterApp';
  showHeader = false;
  firstModuleLoaded = false;
  pathResolveIndicator = false;
  moduleLoadingIndicator = false;
  pathsToLoad = [];
  modulesToLoad = [];

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  private ngUnsubscribe = new Subject();
  
  constructor(private router: Router,
    private authService: AuthService,
    private requestService: RequestService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    
  }

  ngOnInit() {
    this.watchForIsLoggedIn();
    this.watchForLazyModuleLoads();
    this.watchForPageResolve();
    this.handleAuthorized();
    // this.router.events.subscribe(() => {
    //   if (this.isScreenSmall())
    //     this.sidenav.close();
    // })
    // this.matIconRegistry.addSvgIcon(
    //   "Close",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/orion/icons/Close.svg")
    // );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  moduleTrackBy(index: number, moduleName: string) {
    return `module-${moduleName}`;
  }

  pathTrackBy(index: number, pathName: string) {
    return `path-${pathName}`;
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  /**
   * Subscribes to route event emitter to detect if a
   * module is being loaded.
   */
  private watchForLazyModuleLoads() {
    let asyncLoadCount = 0;
    let navigationCount = 0;

    this.router.events
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((event: RouterEvent) => {
          if (event instanceof RouteConfigLoadStart) {
            asyncLoadCount++;
            const updatedValue = [...this.modulesToLoad, event.route.data?.moduleName];
            this.modulesToLoad = updatedValue;
          } else if (event instanceof RouteConfigLoadEnd) {
            asyncLoadCount--;
            this.modulesToLoad = this.modulesToLoad.filter(moduleName =>
              moduleName !== event.route.data.moduleName
            );
            if (!this.firstModuleLoaded) { this.firstModuleLoaded = true; }
          }

          if (event instanceof NavigationStart) {
            navigationCount++;
          } else if (
            event instanceof NavigationEnd ||
            event instanceof NavigationError ||
            event instanceof NavigationCancel
          ) {
            navigationCount--;
          }

          this.moduleLoadingIndicator = !!(navigationCount && asyncLoadCount);
        })
      )
      .subscribe();
  }

  private watchForPageResolve() {
    this.requestService.$spinner
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(spinnerConfig => {
          if (spinnerConfig.enabled) {
            const updatedValue = [...this.pathsToLoad, spinnerConfig.description
               ? spinnerConfig.description : ''];
            this.pathsToLoad = updatedValue;
          } else {
            this.pathsToLoad = this.pathsToLoad.filter(pathName =>
              pathName !== spinnerConfig.description
            );
          }

          this.pathResolveIndicator = !!this.pathsToLoad.length;
        })
      )
      .subscribe();
  }
  private handleAuthorized() {
    const authorized = this.authService.checkAuthorization();
    this.showHeader = authorized;
  }

  private watchForIsLoggedIn() {
    this.authService.$loginSucceeded
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(authData => {
      
        this.showHeader = true;
      });
  }

 
}
