import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppPaths } from './core/routing/constants/app-paths.const';
import { LoginGuard } from './core/routing/guards/login.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: AppPaths.LOGIN.PATH,
    pathMatch: 'full'
  },
  {
    path: AppPaths.LOGIN.PATH, /** Lazy loaded login module */
    loadChildren: () => import('./modules/login/login.module')
      .then(m => m.LoginModule),
    data: {
      moduleName: AppPaths.LOGIN.NAME
    },
    canActivate: [LoginGuard]
  },
  {
    path: AppPaths.BASIC_SEARCH.PATH, /** Lazy loaded basic search module */
    loadChildren: () => import('./modules/basic-search/basic-search.module')
      .then(m => m.BasicSearchModule),
    data: {
      moduleName: AppPaths.BASIC_SEARCH.NAME
    }
  },
  {
    path: AppPaths.USER_CONTACT_LIST.PATH,
    loadChildren: () => import('./modules/user-contact-list/user-contact-list.module')
      .then(m => m.UserContactListModule),
    data: {
      moduleName: AppPaths.USER_CONTACT_LIST.NAME
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      useHash: true,
      enableTracing: false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
