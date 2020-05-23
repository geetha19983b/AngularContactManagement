import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../common/material.module';
import { OrionIconModule } from '../common/orion-icon/orion-icon.module';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    OrionIconModule,
    RouterModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
