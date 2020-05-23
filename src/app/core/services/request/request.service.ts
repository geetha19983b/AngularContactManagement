import { LoginRequest } from './interfaces/login/login-request.i';
import { LoginResponse } from './interfaces/login/login-response.i';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { RequestBuilderService } from './request-builder.service';
import { RequestUrls } from './request-urls.const';
import { LOGIN_RESULT_MOCK } from '../mock/login.service.mock';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PageLoadSpinner } from './request';
import { UserProfileResponse } from './interfaces/user-profile/user-profile-response.i';
import { UserProfileRequest } from './interfaces/user-profile/user-profile-request.i';
import { USER_PROFILE_RESULT_MOCK } from '../mock/user.profile.service.mock';
import { USER_CONTACT_LIST_RESULT_MOCK } from '../mock/user.contact.list.mock';
import { UserContactListResponse } from './interfaces/user-contact-list/user-contact-list.response.i';
import { UserContactListRequest } from './interfaces/user-contact-list/user-contact-list.request.i';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  mock = environment.mock;
  $spinner: BehaviorSubject<PageLoadSpinner>;

  private _sessionId: string;

  set sessionId(value: string) {
    this._sessionId = `${value}`;
  }
  get sessionId(): string {
    return this._sessionId;
  }

  constructor(private requestBuilderService: RequestBuilderService) {
    this.initParams();
  }

  login(requestObj: LoginRequest, mock = this.mock): Observable<LoginResponse> {
    mock = true;
    return mock ? of(LOGIN_RESULT_MOCK) : this.requestBuilderService.setRequest({
      method: 'POST',
      url: RequestUrls.LOGIN,
      json: requestObj
    });
  }

  userProfile(requestObj: UserProfileRequest, mock = this.mock): Observable<UserProfileResponse> {

    return this.requestBuilderService.setRequest({
      method: 'GET',
      url: `${RequestUrls.USERCONTACTLIST}/${requestObj.profileId}` 
    });
  }

  userContactList(requestObj: UserContactListRequest, mock = this.mock)
  : Observable<UserProfileResponse[]> {

    return this.requestBuilderService.setRequest({
      method: 'GET',
      url: RequestUrls.USERCONTACTLIST
    });
  }

  private initParams(): void {
    this.$spinner = new BehaviorSubject({ enabled: false, description: '' });
  }
}