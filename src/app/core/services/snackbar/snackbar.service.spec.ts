import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SnackbarService],
    imports: [HttpClientModule, MatSnackBarModule, BrowserAnimationsModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: SnackbarService = TestBed.inject(SnackbarService);
    expect(service)
    .toBeTruthy();
  });

  it('should call clearSnackBarQueue method', () => {
    const service: SnackbarService = TestBed.inject(SnackbarService);
    service.clearSnackBarQueue();
  });

  it('should call queueSnackBar method', () => {
    const service: SnackbarService = TestBed.inject(SnackbarService);
    service.queueSnackBar();
  });
});
