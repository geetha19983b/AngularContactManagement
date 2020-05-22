import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfileService } from './services/user-profile.service';
import { CardFabIcon } from '../../../app/components/card/card.i';
import { UserProfileResponse, UserContactInfo } from 'src/app/core/services/request/interfaces/user-profile/user-profile-response.i';
import { UserProfileRequest } from 'src/app/core/services/request/interfaces/user-profile/user-profile-request.i';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'ual-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserProfileService]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  expanded = false;
  fabIcons: CardFabIcon[] = [];
  mpBadge = '';
  mmBadge = '';
  expandedText = 'Show More';
  badgeEligible = false;
  userProfileHeader: string;
  userCardData: UserProfileResponse;
  userContactInfo: UserContactInfo;

  constructor(
    private userProfileService: UserProfileService,
  ) { }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.generateUserCardData();
  }

  showMoreOrLessToggle(expanded: boolean) {
    this.expanded = expanded;
    this.expandedText = expanded ? 'Show Less' : 'Show More';
  }

  private generateUserCardData() {
    const userProfileRequest: UserProfileRequest = {
      profileId: '1234'
    };
    this.userProfileService
      .userProfileResults(userProfileRequest)
      .pipe(take(1))
      .subscribe(userResponse => {
        this.userCardData = userResponse;
        this.badgeEligible = true;
        this.generateFabIcons();
      });
  }

  private generateFabIcons() {
    this.fabIcons = [{
      selected: true,
      color: 'accent',
      label: this.buildLabel(this.userCardData),
      headerTitle: this.buildFabIconPanelHeaderTitle(this.userCardData),
      toolTipText: this.buildToolTipText(this.userCardData)
    }];
  }

  private buildLabel(userCardData: UserProfileResponse) {
    return userCardData.firstName.charAt(0)
      .concat(userCardData.lastName.charAt(0));
  }

  private buildFabIconPanelHeaderTitle(userCardData: UserProfileResponse) {
    return this.userCardData ? 'My Profile' : ' ';
  }

  private buildToolTipText(userCardData: UserProfileResponse) {
    return userCardData.firstName
      .concat(' ')
      .concat(userCardData.lastName);
  }
}

