import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardModule } from '../../components/card/card.module';
import { OrionIconModule } from '../../modules/common/orion-icon/orion-icon.module';
import { FormatDateModule } from '../../pipes/date/date.module';
import { ExpandPanelModule } from '../common/expand-panel/expand-panel.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile.routing.module';


@NgModule({
  declarations: [
    UserProfileComponent

  ],
  providers: [],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    CardModule,
    MatListModule,
    OrionIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    ExpandPanelModule,
    FormatDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
