import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PageEvent } from '@angular/material';
import { takeWhile } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

import { Book } from './../../../model/book';
import * as fromBookStore from '../store';
import { ConfirmDailogueComponent } from './../../../shared/component/confirm-dailogue/confirm-dailogue.component';
import { BookError } from './../../../shared/constant/error.constant';
import { AppConstant } from './../../../shared/constant/app.constant';
import { Options } from './../../../model/options';
import { AppService } from './../../../service/app-service/app.service';

@Component({
  selector: 'app-book-listings',
  templateUrl: './book-listings.component.html',
  styleUrls: ['./book-listings.component.scss']
})
export class BookListingsComponent implements OnInit, OnDestroy {

  books: Book[];
  operationInProgress = false;
  pageSize = 2;
  pageSizeOptions = [2, 5, 10];
  pageIndex = 0;
  count: number;
  error: string;
  deletionInProgress = false;
  componentActive = true;
  options: Options[];

  constructor(private store: Store<fromBookStore.State>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private appService: AppService) { }

  ngOnInit() {
    this.options = this.appService.getOptions();
    this.getBooksFromStore();
    this.getCountFromStore();
    this.getErrorFromStore();
    this.getOperationInProgressFromStore();
    this.getActionStatusFromStore();
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
    ).subscribe(response => this.error = response);
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

  onBookDeleted(value: number) {
    let message = '';
    if (value === 1) {
      this.store.dispatch(new fromBookStore.GetTotalNumberOfBooks(false));
      message = AppConstant.bookDeleteSuccess;
    } else if (value === -1) {
      message = BookError.deleteBookFail;
    }
    this.deletionInProgress = false;
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  getOptionLabel(value: string): string {
    return this.options.find(element => {
      return element.value === value;
    }).label;
  }
}
