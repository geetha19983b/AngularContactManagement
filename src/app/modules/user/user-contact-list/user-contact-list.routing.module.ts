import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserContactListComponent } from './user-contact-list.component';
import { AppPaths } from 'src/app/core/routing/constants/app-paths.const';
import { UserProfileComponent } from '../user-profile/user-profile.component';

export const USER_CONTACT_LIST_ROUTES: Routes = [
  {
    path: '',
    component: UserContactListComponent
  },
  {
    path: AppPaths.CONTACT.PATH,
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(USER_CONTACT_LIST_ROUTES)],
  exports: [RouterModule]
})
export class UserContactListRoutingModule { }
