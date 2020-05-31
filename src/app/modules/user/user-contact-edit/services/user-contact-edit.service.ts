import { Injectable } from '@angular/core';
import { UserProfileRequest } from '../../../../core/services/request/interfaces/user-profile/user-profile-request.i';
import { RequestService } from '../../../../core/services/request/request.service';

@Injectable()
export class UserContactEditService {

  constructor(
    private requestService: RequestService
  ) { }

  userContactEditDetails(userProfileRequest: UserProfileRequest) {
    return this.requestService.userProfile(userProfileRequest);
  }

}
