import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { PageEvent } from '@angular/material'
import { takeWhile } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

import { Book } from './../../../model/book';
import * as fromBookStore from '../store';
import { getBooks, getOperationInProgress, getActionStatus } from './../store/book.selector';
import { ConfirmDailogueComponent } from './../../../shared/component/confirm-dailogue/confirm-dailogue.component';
import { BookError } from './../../../shared/constant/error.constant';
import { AppConstant } from './../../../shared/constant/app.constant';
import { Options } from './../../../model/options';
import { element } from 'protractor';

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
  deletionInProgress: boolean = false;
  componentActive: boolean = true;
  firstLoad: boolean = true;
  options: Options[];

  constructor(private store: Store<fromBookStore.State>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getOptionsFromStore();
    this.getBooksFromStore();
    this.getCountFromStore();
    this.getErrorFromStore();
    this.getOperationInProgressFromStore();
    this.getActionStatusFromStore();
  }

  getOptionsFromStore(): void {
    this.store.pipe(select(fromBookStore.getOptions)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(response => this.options = response);
  }

  getBooksFromStore(): void {
    this.store.pipe(select(fromBookStore.getBooks)).subscribe(response => this.books = response);
  }

  getCountFromStore(): void {
    this.store.dispatch(new fromBookStore.GetTotalNumberOfBooks(true));
    this.store.pipe(select(fromBookStore.getCount)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(
      response => {
        this.count = response;
        if ((response >= this.pageSize && this.books.length < this.pageSize) || 
            (response === 1 && this.books.length === 0)) {
          this.pageIndex = this.pageIndex > 0 ? --this.pageIndex : this.pageIndex;
          this.store.dispatch(new fromBookStore.LoadBook(this.pageSize, this.pageIndex));
        }
      });
  }

  getErrorFromStore(): void {
    this.store.pipe(select(fromBookStore.getError)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(response => this.error = response)
  }

  getOperationInProgressFromStore(): void {
    this.store.pipe(select(fromBookStore.getOperationInProgress)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(response => this.operationInProgress = response);
  }

  getActionStatusFromStore(): void {
    this.store.pipe(select(fromBookStore.getActionStatus)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(
      response => {
        this.deletionInProgress = false;
        if (response !== 0) {
          this.onBookDeleted(response);
        }
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.store.dispatch(new fromBookStore.LoadBook(this.pageSize, event.pageIndex));
  }

  onDelete(_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDailogueComponent, {
      width: '250px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletionInProgress = true;
        this.store.dispatch(new fromBookStore.DeleteBook(_id));
      }
    });
  }

  onBookDeleted(response: number) {
    if (response == 1) {
      this.store.dispatch(new fromBookStore.GetTotalNumberOfBooks(false));
      this.snackBar.open(AppConstant.bookDeleteSuccess, '', {
        duration: 2000,
      });
    }
  }

  getOptionLabel(value: string): string {
    return this.options.find(element => {
      return element.value === value;
    }).label
  }
}
