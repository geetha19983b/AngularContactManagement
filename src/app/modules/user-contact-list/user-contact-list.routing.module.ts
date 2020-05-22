import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserContactListComponent } from './user-contact-list.component';

export const USER_CONTACT_LIST_ROUTES: Routes = [{
  path: '',
  component: UserContactListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(USER_CONTACT_LIST_ROUTES)],
  exports: [RouterModule]
})
export class UserContactListRoutingModule { }
