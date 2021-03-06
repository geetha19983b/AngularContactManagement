import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatDateModule } from 'src/app/pipes/date/date.module';
import { MaterialModule } from '../../common/material.module';
import { OrionIconModule } from '../../common/orion-icon/orion-icon.module';
import { UserContactListComponent } from './user-contact-list.component';
import { UserContactListRoutingModule } from './user-contact-list.routing.module';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserContactEditComponent } from '../user-contact-edit/user-contact-edit.component';
/** Component Modules */
@NgModule({
  declarations: [
    UserContactListComponent,
    UserProfileComponent,
    UserContactEditComponent
  ],
  providers: [],
  imports: [
    MaterialModule,
    CommonModule,
    OrionIconModule,
    UserContactListRoutingModule,
    FormatDateModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class UserContactListModule { }
