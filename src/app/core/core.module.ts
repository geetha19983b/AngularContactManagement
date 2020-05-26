import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from '../modules/header/header.component';
import { HeaderModule } from '../modules/header/header.module';
import { OrionIconModule } from '../modules/common/orion-icon/orion-icon.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrionIconModule,
    HttpClientModule,
    HeaderModule
  ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    OrionIconModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the Navigator module');
    }
  }
}
