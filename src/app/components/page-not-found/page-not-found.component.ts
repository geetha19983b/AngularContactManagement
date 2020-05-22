import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'ual-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  path: string;

  private ngUnsubscribe = new Subject<boolean>();

  constructor(private route: ActivatedRoute) { }

  /** Sets the reccomended path to display to agent */
  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: { path: string }) => {
        this.path = data.path;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
