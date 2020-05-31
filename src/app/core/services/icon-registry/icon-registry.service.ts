import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { take } from 'rxjs/internal/operators/take';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  /**
   * Checks to see if the icon is already registered
   * If not registered, then register it.
   */
  checkRegisteredIcons(icon: string) {
    debugger;
    this.matIconRegistry.getNamedSvgIcon(icon)
      .pipe(
        take(1),
        catchError(err => of(undefined))
      )
      .subscribe(data => {
        if (!data) {
          this.registerIcon(icon);
        }
      });
  }

  registerIcon(icon: string): void {
    this.matIconRegistry.addSvgIcon(
      `${icon}`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/orion/icons/${icon}.svg`)
    );
  }
}
