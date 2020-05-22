import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandPanelComponent } from './expand-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    ExpandPanelComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  exports: [
    ExpandPanelComponent
  ]
})
export class ExpandPanelModule { }
