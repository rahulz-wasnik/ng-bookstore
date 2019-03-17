import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from './../../../model/book';

@Component({
  selector: 'app-book-listings',
  templateUrl: './book-listings.component.html',
  styleUrls: ['./book-listings.component.scss']
})
export class BookListingsComponent implements OnInit {

  books: Book[]

  operationInProgress: boolean = false;

  pageSize: number = 2
  //PostStore.initialState.pageSize;

  pageSizeOptions = [1, 2, 3];

  pageIndex: number = 0
  // PostStore.initialState.pageIndex;

  count$: Observable<number>;

  constructor() { }

  ngOnInit() {
  }

}
