import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserContactListResponse } from 'src/app/core/services/request/interfaces/user-contact-list/user-contact-list.response.i';
import { UserContactListService } from './services/user-contact-list.service';
import { UserContactListRequest } from 'src/app/core/services/request/interfaces/user-contact-list/user-contact-list.request.i';
import { take } from 'rxjs/internal/operators/take';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { of } from 'rxjs/internal/observable/of';
import { UserProfileResponse } from 'src/app/core/services/request/interfaces/user-profile/user-profile-response.i';

@Component({
  selector: 'ual-user-contact-list',
  templateUrl: './user-contact-list.component.html',
  styleUrls: ['./user-contact-list.component.scss'],
  providers: [UserContactListService]
})
export class UserContactListComponent implements OnInit, OnDestroy {
  userContactDetails: UserProfileResponse[];
  
  _contactListFilter = '';
  get contactListFilter(): string {
    return this._contactListFilter;
  }
  set contactListFilter(value: string) {
    this._contactListFilter = value;
    this.filteredContactList = this.contactListFilter ? this.performFilter(this.contactListFilter)
     : this.userContactDetails;
  }

  filteredContactList: UserProfileResponse[];
  
  constructor(private userContactListService: UserContactListService) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.loadUserContactDetails();

  }
  
  trackByIdentify(index, item) {
    return index;
  }
 
  private loadUserContactDetails() {
    const userContactListRequest: UserContactListRequest = {
      userId: '1234'
    };
    this.userContactListService
      .userContactListResults(userContactListRequest)
      .pipe(take(1))
      .subscribe(userResponse => {
        this.userContactDetails = userResponse;
        this.filteredContactList=this.performFilter(this.contactListFilter);
      }, error => {
        this.userContactDetails = [];
      });
  }

  private performFilter(filterBy: string): UserProfileResponse[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.userContactDetails.filter((contact: UserProfileResponse) =>
      contact.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      contact.lastName.toLocaleLowerCase().indexOf(filterBy) != -1);
  }
}


