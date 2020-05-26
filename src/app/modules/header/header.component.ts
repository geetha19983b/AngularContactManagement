import { OnInit, OnDestroy, Component, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'ual-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  private ngUnsubscribe = new Subject();
  
  constructor(){}

  ngOnInit() {}

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}