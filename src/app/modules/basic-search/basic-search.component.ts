import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppPaths } from 'src/app/core/routing/constants/app-paths.const';
import { Subject } from 'rxjs/internal/Subject';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ual-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.scss']
})
export class BasicSearchComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit() {}
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadContacts() {
    this.router.navigate([`./${AppPaths.USER_CONTACT_LIST.ROUTE}`], {
      relativeTo: this.activatedRoute
    });
  }
}