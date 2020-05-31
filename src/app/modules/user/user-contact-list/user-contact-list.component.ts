import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserContactListResponse } from 'src/app/core/services/request/interfaces/user-contact-list/user-contact-list.response.i';
import { UserContactListService } from './services/user-contact-list.service';
import { UserContactListRequest } from 'src/app/core/services/request/interfaces/user-contact-list/user-contact-list.request.i';
import { take } from 'rxjs/internal/operators/take';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { of } from 'rxjs/internal/observable/of';
import { UserProfileResponse } from 'src/app/core/services/request/interfaces/user-profile/user-profile-response.i';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';

@Component({
  selector: 'ual-user-contact-list',
  templateUrl: './user-contact-list.component.html',
  styleUrls: ['./user-contact-list.component.scss'],
  providers: [UserContactListService]
})
export class UserContactListComponent implements OnInit, OnDestroy {
  userContactDetails: UserProfileResponse[];
  selectedItem:string;
  
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
  SelectionStatusOfContacts: any = {};   
  constructor(private userContactListService: UserContactListService,
    private snackbarService: SnackbarService,) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.loadUserContactDetails();
    this.displayNotification('Welcome Back');
    this.displayNotification('Hope you enjoy this demo');
  }
  
  displayNotification(message:string) {
    this.snackbarService.queueSnackBar({
      data: {
        type: 'success',
        hasIcon: true,
        iconName: 'Check_circle',
        message: message,
        hasSuccessIcon: true,
       // hasAction: true,
        //actionName: 'Close'
      },
      horizontalPosition: 'start',
      panelClass: 'snack-bar-full-width'
    });
  }

  trackByIdentify(index, item) {
    return index;
  }
  
  filterContacts(value) {
    this.selectedItem = value;
    console.log(value);
  }

  sendNotification() {  
    Object.keys(this.SelectionStatusOfContacts).forEach((item, index) => {
        if (this.SelectionStatusOfContacts[item])
            console.log(item);
    });
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


