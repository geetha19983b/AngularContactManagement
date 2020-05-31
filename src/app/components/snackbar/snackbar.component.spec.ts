import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarComponent } from './snackbar.component';
import { MatSnackBarRef, MatSnackBarModule, MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SnackBarComponent],
      imports: [MatSnackBarModule, HttpClientModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [{
        provide: MatSnackBarRef,
        useValue: {dismiss: () => {} }
        }, {
        provide: MAT_SNACK_BAR_DATA,
        useValue: {}
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });

  it('should call dismiss method', () => {
    component.dismiss();
  });
});
