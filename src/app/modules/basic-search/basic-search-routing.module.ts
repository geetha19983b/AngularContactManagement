import { NgModule } from '@angular/core';
import { AppPaths } from '../../core/routing/constants/app-paths.const';
import { BasicSearchComponent } from './basic-search.component';
import { RouterModule, Routes } from '@angular/router';

const BASIC_SEARCH_ROUTES: Routes = [
  {
    path: '',
    component: BasicSearchComponent,
    children: [
     // {
        // path: AppPaths.USER_CONTACT_LIST.PATH,
        // loadChildren: () => import('../user-contact-list/user-contact-list.module')
        //   .then(m => m.UserContactListModule),
        // data: {
        //   moduleName: AppPaths.USER_CONTACT_LIST.NAME
       // }
      //},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(BASIC_SEARCH_ROUTES)],
  exports: [RouterModule]
})
export class BasicSearchRoutingModule { }
