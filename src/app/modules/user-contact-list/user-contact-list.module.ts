import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { UserContactListRoutingModule } from './user-contact-list.routing.module';
import { UserContactListComponent } from './user-contact-list.component';
import { OrionIconModule } from '../common/orion-icon/orion-icon.module';
import { ExpandPanelModule } from '../common/expand-panel/expand-panel.module';
import { FormatDateModule } from 'src/app/pipes/date/date.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
/** Component Modules */
@NgModule({
  declarations: [
    UserContactListComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    OrionIconModule,
    UserContactListRoutingModule,
    ExpandPanelModule,
    FormatDateModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule

  ]
})
export class UserContactListModule { }
