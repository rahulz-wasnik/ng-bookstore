import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Book } from './../../model/book';
import { Options } from './../../model/options';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private http: HttpClient) { }

  options$ = this.http.get<Options[]>(environment.api + 'book/options').pipe(
    shareReplay(1)
  );

  getOptions(): Observable<Options[]> {
    return this.options$;
  }

  getTotalNumberOfBooks(): Observable<number> {
    return this.http.get<number>(environment.api + 'book/count');
  }

  loadBooks(pageSize: number, pageIndex: number): Observable<Book[]> {
    const queryParams = `?pageSize=${pageSize}&pageIndex=${pageIndex + 1}`;
    return this.http.get<Book[]>(environment.api + 'book' + queryParams);
  }
}
