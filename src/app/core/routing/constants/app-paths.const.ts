import { AppPath } from '../interfaces/app-path.i';

export class AppPaths {
  // Login Config -- START
  static readonly LOGIN: AppPath = {
    NAME: 'Login',
    PATH: 'login',
    ROUTE: '/login'
  };
  // Login Config -- END

  // Search Config -- START
  static readonly BASIC_SEARCH: AppPath = {
    NAME: 'Basic Search',
    PATH: 'basic-search',
    ROUTE: '/basic-search'
  };

  static readonly USER_CONTACT_LIST: AppPath = {
    NAME: 'User Contact List',
    PATH: 'user-contact-list',
    ROUTE: '/user-contact-list'
  };
}