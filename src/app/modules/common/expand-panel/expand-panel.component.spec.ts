import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandPanelComponent } from './expand-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ExpandPanelComponent', () => {
  let component: ExpandPanelComponent;
  let fixture: ComponentFixture<ExpandPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandPanelComponent],
      imports: [ BrowserAnimationsModule, MatExpansionModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should call handleAfterCollapse function', () => {
    const spy = spyOn(component, 'handleAfterCollapse');
    component.handleAfterCollapse();
    expect(spy)
      .toHaveBeenCalled();
  });

  it('handleAfterCollapse should call afterCollapse emit event', () => {
    const spy = spyOn(component.afterCollapse, 'emit');
    component.handleAfterCollapse();
    expect(spy)
      .toHaveBeenCalled();
  });

  it('should call handleAfterExpand function', () => {
    const spy = spyOn(component, 'handleAfterExpand');
    component.handleAfterExpand();
    expect(spy)
      .toHaveBeenCalled();
  });

  it('handleAfterExpand should call afterExpand emit event', () => {
    const spy = spyOn(component.afterExpand, 'emit');
    component.handleAfterExpand();
    expect(spy)
      .toHaveBeenCalled();
  });

  it('should call handleClosed function', () => {
    const spy = spyOn(component, 'handleClosed');
    component.handleClosed();
    expect(spy)
      .toHaveBeenCalled();
  });

  it('handleClosed should call expandToggled emit event', () => {
    const spy = spyOn(component.expandToggled, 'emit');
    component.handleClosed();
    component.expandToggled.emit(false);
    expect(spy)
      .toHaveBeenCalled();
  });

  it('should call handleOpened function', () => {
    const spy = spyOn(component, 'handleOpened');
    component.handleOpened();
    expect(spy)
      .toHaveBeenCalled();
  });

  it('handleOpened should call expandToggled emit event', () => {
    const spy = spyOn(component.expandToggled, 'emit');
    component.handleOpened();
    component.expandToggled.emit(true);
    expect(spy)
      .toHaveBeenCalled();
  });
});
