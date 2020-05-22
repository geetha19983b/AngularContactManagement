import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrionIconComponent } from './orion-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

describe('OrionIconComponent', () => {
  let component: OrionIconComponent;
  let fixture: ComponentFixture<OrionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrionIconComponent],
      imports: [ MatIconModule, HttpClientModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrionIconComponent);
    component = fixture.componentInstance;
    component.icon = 'icon';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
