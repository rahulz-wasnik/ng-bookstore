import { Injectable } from '@angular/core';
import { Book } from './../../model/book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {

  constructor(private http: HttpClient) { }

  add(book: Book): Observable<Book> {
    return this.http.post<Book>(environment.api + 'book/add', JSON.stringify(book)).pipe(
        tap(response => console.info('Post created - ', JSON.stringify(response)))
    );
}
}
