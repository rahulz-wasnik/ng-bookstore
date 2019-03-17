import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { LoadBookResponse } from './../../model/load-books-response';
import { environment } from './../../../environments/environment';
import { ErrorHandlerService } from './../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  loadCategories() {
    
  }

  loadBooks(pageSize: number, pageIndex: number): Observable<LoadBookResponse> {
    console.log('load');
    const queryParams = `?pageSize=${pageSize}&pageIndex=${pageIndex + 1}`;
    return this.http.get<LoadBookResponse>(environment.api + 'posts' + queryParams).pipe(
      catchError(error => this.errorHandlerService.handleError(error))
    )
  }
}
