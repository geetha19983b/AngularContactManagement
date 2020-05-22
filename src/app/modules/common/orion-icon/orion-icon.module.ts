import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrionIconComponent } from './orion-icon.component';

@NgModule({
  declarations: [
    OrionIconComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    OrionIconComponent
  ]
})
export class OrionIconModule { }
