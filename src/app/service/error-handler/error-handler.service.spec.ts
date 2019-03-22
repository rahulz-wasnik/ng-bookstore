import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {

  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerService]
    });
    service = TestBed.get(ErrorHandlerService);
  });

  it('should be created', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));

  it('should throw back the same error', async() => {
    const error = new HttpErrorResponse({
      error: 'Error',
      status: 500
    });
    service.handleError(error).subscribe(
      (error => {
        expect(error.error).toBe('Error');
      })
    )
  });
});
