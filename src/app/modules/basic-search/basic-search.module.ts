import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicSearchRoutingModule } from './basic-search-routing.module';
import { BasicSearchComponent } from './basic-search.component';
import { UserProfileModule } from '../user-profile/user-profile.module';
import {MatButtonModule} from '@angular/material/button';
/** Component Modules */
@NgModule({
  declarations: [
    BasicSearchComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    BasicSearchRoutingModule,
    UserProfileModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class BasicSearchModule { }
