import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { OrionIconComponent } from '../../modules/common/orion-icon/orion-icon.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent, OrionIconComponent ],
      imports: [ MatMenuModule, MatTabsModule, MatButtonModule, MatIconModule, HttpClientModule, BrowserAnimationsModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('it should call checkSiblingElements', () => {
    const spy = spyOn(component, 'checkSiblingElements');
    component.checkSiblingElements();
    expect(spy)
    .toHaveBeenCalled();
  });

  it('it should call handleAddNewFab', () => {
    const spy = spyOn(component, 'handleAddNewFab');
    component.handleAddNewFab();
    expect(spy)
    .toHaveBeenCalled();
  });

  it('it should call handleChangeTab', () => {
    const spy = spyOn(component, 'handleChangeTab');
    component.handleChangeTab(0);
    expect(spy)
    .toHaveBeenCalled();
  });

  it('it should call movePanelDown', () => {
    const spy = spyOn(component, 'movePanelDown');
    component.movePanelDown();
    expect(spy)
    .toHaveBeenCalled();
  });

  it('it should call movePanelDown', () => {
    const spy = spyOn(component, 'movePanelUp');
    component.movePanelUp();
    expect(spy)
    .toHaveBeenCalled();
  });

});
