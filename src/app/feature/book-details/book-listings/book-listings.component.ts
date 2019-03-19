import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PageEvent } from '@angular/material'
import { takeWhile } from 'rxjs/operators';

import { Book } from './../../../model/book';
import * as fromBookStore from '../store';
import { getBooks } from './../store/book.selector';

@Component({
  selector: 'app-book-listings',
  templateUrl: './book-listings.component.html',
  styleUrls: ['./book-listings.component.scss']
})
export class BookListingsComponent implements OnInit, OnDestroy {

  books: Book[]

  operationInProgress: boolean = false;

  pageSize: number = fromBookStore.initialState.pageSize;

  pageSizeOptions = [2, 5, 10];

  pageIndex: number = fromBookStore.initialState.pageIndex;

  count: number;

  error: string;

  componentActive: boolean = true;

  constructor(private store: Store<fromBookStore.State>) { }

  ngOnInit() {
    
    this.store.pipe(select(fromBookStore.getBooks)).subscribe(
      response => {
        this.books = response;
        if(this.pageIndex > 0 && this.books.length === 0) {
          this.pageIndex--;
          this.store.dispatch(new fromBookStore.LoadBook(this.pageSize, this.pageIndex));
        }
      }
    );
    
    this.store.pipe(select(fromBookStore.getCount)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(
      response => {
        this.count = response
      }
    );
    
    this.store.pipe(select(fromBookStore.getError)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(
      response => {
        this.error = response
      }
    );
    
    // TODO: Move to a different component
    this.store.pipe(select(fromBookStore.getOperationInProgress)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(
      response => this.operationInProgress = response 
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.store.dispatch(new fromBookStore.LoadBook(this.pageSize, event.pageIndex));
  }
}
