import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserContactInfo, UserProfileResponse } from 'src/app/core/services/request/interfaces/user-profile/user-profile-response.i';
import { UserProfileService } from './services/user-profile.service';
import { UserProfileRequest } from 'src/app/core/services/request/interfaces/user-profile/user-profile-request.i';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'ual-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserProfileService]
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userData: UserProfileResponse;
  userContactInfo: UserContactInfo;
  
  constructor(
    private userProfileService: UserProfileService,
    private route: ActivatedRoute
  ) { }


  ngOnDestroy(): void {
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.getUserDetails(userId);
  }

  private getUserDetails(userId: string) {
    const userProfileRequest: UserProfileRequest = {
      profileId: userId
    }
    this.userProfileService.userProfileDetails(userProfileRequest)
      .pipe(take(1))
      .subscribe(userResponse => {
        this.userData = userResponse
      });;
  }
}

