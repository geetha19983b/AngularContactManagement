import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'ual-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  constructor(){}

  ngOnInit() {}

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}