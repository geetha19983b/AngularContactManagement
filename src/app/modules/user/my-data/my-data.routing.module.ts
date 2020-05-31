import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDataComponent } from './my-data.component';

export const MY_DATA_ROUTES: Routes = [
  {
    path: '',
    component: MyDataComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(MY_DATA_ROUTES)],
  exports: [RouterModule]
})
export class MyDataRoutingModule { }
