import { Injectable } from '@angular/core';
import { Book } from './../../model/book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {

  constructor(private http: HttpClient) { }

  add(book: Book): Observable<Book> {
    return this.http.post<Book>(environment.api + 'book/add', JSON.stringify(book), {
      headers: {
        'Content-Type': "application/json"
      }
    })
  }

  delete(_id: string): Observable<string> {
    return this.http.delete<string>(environment.api + 'book/delete/' + _id)
}
}
