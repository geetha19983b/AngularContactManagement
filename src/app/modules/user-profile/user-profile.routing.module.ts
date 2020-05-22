import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';

export const USER_PROFILE_ROUTES: Routes = [{
  path: '',
  component: UserProfileComponent
}];

@NgModule({
  imports: [RouterModule.forChild(USER_PROFILE_ROUTES)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
