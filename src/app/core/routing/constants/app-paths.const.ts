import { AppPath } from '../interfaces/app-path.i';

export class AppPaths {
  // Login Config -- START
  static readonly LOGIN: AppPath = {
    NAME: 'Login',
    PATH: 'login',
    ROUTE: '/login'
  };
  // Login Config -- END

  static readonly USER_CONTACT_LIST: AppPath = {
    NAME: 'User Contact List',
    PATH: 'user-contact-list',
    ROUTE: '/user-contact-list'
  };

  static readonly CONTACT: AppPath = {
    NAME: 'Contact',
    PATH: 'contact/:id',
    ROUTE: '/contact'
  };
  static readonly CONTACTEDIT: AppPath = {
    NAME: 'ContactEdit',
    PATH: 'contact/:id/edit',
    ROUTE: '/contactedit'
  };


  static readonly MY_DATA: AppPath = {
    NAME: 'My Data',
    PATH: 'my-data',
    ROUTE: '/my-data'
  };
}