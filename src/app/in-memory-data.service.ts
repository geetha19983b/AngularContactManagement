import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { USER_CONTACT_LIST_RESULT_MOCK } from './core/services/mock/user.contact.list.mock';
import { UserContactListResponse } from './core/services/request/interfaces/user-contact-list/user-contact-list.response.i';
import { UserProfileResponse } from './core/services/request/interfaces/user-profile/user-profile-response.i';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contactList = USER_CONTACT_LIST_RESULT_MOCK;
    return {contactList};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(contactList: UserProfileResponse[]): number {
    return contactList.length > 0 ? Math.max(...contactList.map(contact => contact.id)) + 1 : 100;
  }
}