import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatDateModule } from 'src/app/pipes/date/date.module';
import { MaterialModule } from '../../common/material.module';
import { OrionIconModule } from '../../common/orion-icon/orion-icon.module';
import { MyDataComponent } from './my-data.component';
import { MyDataRoutingModule } from './my-data.routing.module';
/** Component Modules */
@NgModule({
  declarations: [
    MyDataComponent
  ],
  providers: [],
  imports: [
    MaterialModule,
    CommonModule,
    OrionIconModule,
    FormatDateModule,
    FormsModule,
    ReactiveFormsModule,
    MyDataRoutingModule

  ]
})
export class MyDataModule { }
