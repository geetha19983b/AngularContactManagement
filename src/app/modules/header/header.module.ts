import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { OrionIconModule } from '../common/orion-icon/orion-icon.module';
import { HeaderComponent } from './header.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    OrionIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
