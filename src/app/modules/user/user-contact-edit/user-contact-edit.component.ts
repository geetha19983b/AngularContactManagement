import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserContactInfo, UserProfileResponse } from 'src/app/core/services/request/interfaces/user-profile/user-profile-response.i';
import { UserProfileRequest } from 'src/app/core/services/request/interfaces/user-profile/user-profile-request.i';
import { take } from 'rxjs/internal/operators/take';
import { UserContactEditService } from './services/user-contact-edit.service';
import { UserContactFormData } from './interfaces/user-contact-edit.i';
import { FormBuilder } from '@angular/forms';
import { UserContactEditConsts } from './constants/user-contact-edit.consts';
import moment from 'moment';
import { FormUtils } from 'src/app/common/forms/form-utils';

@Component({
  selector: 'ual-user-contact-edit',
  templateUrl: './user-contact-edit.component.html',
  styleUrls: ['./user-contact-edit.component.scss'],
  providers: [UserContactEditService]
})
export class UserContactEditComponent implements OnInit, OnDestroy {
  userData: UserProfileResponse;
  userContactInfo: UserContactInfo;
  contactForm: FormGroupTyped<UserContactFormData>;
  CONTACT_FORM_CONSTS = UserContactEditConsts;
  
  constructor(
    private fb: FormBuilder,
    private UserContactEditService: UserContactEditService,
    private route: ActivatedRoute
  ) { }


  ngOnDestroy(): void {
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.getUserDetails(userId);
  }

  private getUserDetails(userId: string) {
    const UserContactEditRequest: UserProfileRequest = {
      profileId: userId
    }
    this.UserContactEditService.userContactEditDetails(UserContactEditRequest)
      .pipe(take(1))
      .subscribe(userResponse => {
        this.userData = userResponse
        this.initFormData();
      });;
  }
  
  submitContactForm(params: UserContactFormData) {
    if (!this.contactForm.valid) {
      FormUtils.showRequiredControls(this.contactForm);
      return;
    }
    console.log(JSON.stringify(params));
  }

  private initFormData() {
    this.contactForm = this.fb.group({
      firstName: [
        this.userData.firstName,
        this.CONTACT_FORM_CONSTS.FIRST_NAME_VALIDATORS
      ],
      lastName: [
        this.userData.lastName,
        this.CONTACT_FORM_CONSTS.LAST_NAME_VALIDATORS
      ],
      birthDate: [
        this.userData.birthDate &&
        moment(this.userData.birthDate),
        this.CONTACT_FORM_CONSTS.DATE_VALIDATORS
      ],
      trivia: [
        this.userData.trivia,
        this.CONTACT_FORM_CONSTS.TRIVIA_VALIDATORS
      ],
      bio: [
        this.userData.bio,
        this.CONTACT_FORM_CONSTS.BIO_VALIDATORS
      ]
    }) as FormGroupTyped<UserContactFormData>;
  }
}

