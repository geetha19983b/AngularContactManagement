import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'ual-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SideNavComponent implements OnInit {
  displaySideNav = false;
  constructor() {
  }

  ngOnInit(): void {
  }

  toggleToolboox() {    
    this.displaySideNav= !this.displaySideNav;  
  }

  trackByIdentify(index, item) { 
       return item; 
   }

}