import { Injectable } from '@angular/core';
import { UserProfileRequest } from '../../../core/services/request/interfaces/user-profile/user-profile-request.i';
import { RequestService } from '../../../core/services/request/request.service';

@Injectable()
export class UserProfileService {

  constructor(
    private requestService: RequestService
  ) { }

  userProfileResults(userProfileRequest: UserProfileRequest) {
    return this.requestService.userProfile(userProfileRequest);
  }

}
