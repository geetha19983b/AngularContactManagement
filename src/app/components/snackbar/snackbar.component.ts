import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarParams } from '../../core/services/snackbar/interfaces/snack-params.i';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';
import { AppPaths } from '../../core/routing/constants/app-paths.const';

import { SnackbarConsts } from './constants/snackbar.consts';

@Component({
  selector: 'ual-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackBarComponent implements OnInit, OnDestroy {
  contentClasses: object;
  name: string;

  private ngUnsubscribe = new Subject<unknown>();

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public params: SnackBarParams,
    private snackBarRef: MatSnackBarRef<SnackBarComponent>,
    private router: Router
  ) { }

  ngOnInit() {
    this.contentClasses = this.formContentClasses();

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  dismiss() {
    this.snackBarRef.dismiss();
  }

  actionCallback() {
       this.dismiss();
      window.location.reload();
  }
  
  private formContentClasses() {
    return {
      [this.params.type]: true,
      'snack-container': true
    };
  }
}
