import { Injectable } from '@angular/core';
import { UserContactListRequest } from 'src/app/core/services/request/interfaces/user-contact-list/user-contact-list.request.i';
import { RequestService } from '../../../core/services/request/request.service';

@Injectable()
export class UserContactListService {

  constructor(
    private requestService: RequestService
  ) { }

  userContactListResults(userContactListRequest: UserContactListRequest){
    return this.requestService.userContactList(userContactListRequest);
  }

}
