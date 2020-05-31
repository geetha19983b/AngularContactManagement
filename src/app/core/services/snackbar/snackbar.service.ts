import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { tap } from 'rxjs/internal/operators/tap';
import { Subject } from 'rxjs/internal/Subject';
import { SnackBarComponent } from '../../../components/snackbar/snackbar.component';
import { SnackBarParams, SnackBarQueueItem } from './interfaces/snack-params.i';
import { delay } from 'rxjs/internal/operators/delay';
import { take } from 'rxjs/internal/operators/take';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService implements OnDestroy {
  private readonly snackBarQueue = new BehaviorSubject<SnackBarQueueItem[]>([]);
  private readonly snackBarQueue$ = this.snackBarQueue.asObservable();
  private readonly ngDestroy = new Subject();
  private readonly clearQueue = new Subject();

  constructor(
    private matSnackBar: MatSnackBar
  ) {
    this.initSnackbarQueue();
  }

  ngOnDestroy() {
    this.snackBarQueue.next([]);
    this.snackBarQueue.complete();
    this.ngDestroy.next();
    this.ngDestroy.complete();
    this.clearQueue.next();
    this.clearQueue.complete();
  }

  queueSnackBar(configParams?: MatSnackBarConfig<SnackBarParams>) {
    this.snackBarQueue.next(
      this.snackBarQueue.value.concat([{ configParams, beingDispatched: false }])
    );
  }

  /**
   * @Description Closes the current snackbar
   * then closes the show next snackbar queue
   * then clears the snackBarQueue
   */
  clearSnackBarQueue() {
    this.matSnackBar.dismiss();
    this.clearQueue.next();
    this.snackBarQueue.next([]);
  }

  private initSnackbarQueue() {
    /* Dispatches all queued snack bars one by one */
    this.snackBarQueue$
      .pipe(
        filter(queue => queue.length > 0 && !queue[0].beingDispatched),
        tap(() => {
          const updatedQueue = this.snackBarQueue.value;
          updatedQueue[0].beingDispatched = true;
          this.snackBarQueue.next(updatedQueue);
        }),
        map(queue => queue[0]),
        takeUntil(this.ngDestroy))
      .subscribe(snackBarItem => {
        this.showSnackbar(snackBarItem.configParams);
      });
  }

  private showSnackbar(configParams?: MatSnackBarConfig<SnackBarParams>) {
    this.removeDismissedSnackBar(
      this.matSnackBar.openFromComponent(SnackBarComponent, configParams)
      .afterDismissed()
      // this.matSnackBar.open(configParams.data.message, 'OK', {
      //   panelClass: configParams.panelClass
      // }).afterDismissed()
        
      );

  }

  /* Remove dismissed snack bar from queue and triggers another one to appear */
  private removeDismissedSnackBar(dismissed: Observable<MatSnackBarDismiss>) {
    dismissed
      .pipe(
        delay(250),
        take(1),
        takeUntil(this.clearQueue))
      .subscribe(() => {
        const updatedQueue = this.snackBarQueue.value;

        if (updatedQueue[0].beingDispatched) { updatedQueue.shift(); }

        this.snackBarQueue.next(updatedQueue);
      });
  }
}
