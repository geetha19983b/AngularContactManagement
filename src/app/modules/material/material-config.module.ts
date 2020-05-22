import { NoopScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { UAL_DATE_FORMATS } from './consts/date-format-config.const';
import { SNACKBAR_CONFIG } from './consts/snackbar-config.const';

/**
 * Scroll strategy for material menus, do nothing on scroll.
 * Must use explicit function format for this work
 */
// tslint:disable-next-line: only-arrow-functions
export function scrollFactory(overlay: Overlay): () => NoopScrollStrategy {
  return () => overlay.scrollStrategies.noop();
}

/** This module is for setting default properties of material components */
@NgModule({
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }, // All form fields should have the outline appearance
    { provide: MAT_MENU_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }, // Mat menu lazy load issue
    { provide: MAT_SELECT_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }, // Mat select lazy load issue
    { provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }, // Mat autocomplete lazy load issue
    { provide: MAT_DATEPICKER_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }, // Mat datepicker lazy load issue
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: UAL_DATE_FORMATS },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_CONFIG
    }
  ],
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class MaterialConfigModule {
  constructor(@Optional() @SkipSelf() material: MaterialConfigModule) {
    if (material) {
      throw new Error('You should import material module only in the Navigator module');
    }
  }
}
