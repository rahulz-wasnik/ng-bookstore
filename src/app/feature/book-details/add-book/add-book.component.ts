import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as fromBookStore from '../store';

import { AppService } from './../../../service/app-service/app.service';
import { Observable } from 'rxjs';

import { ConfirmDailogueComponent } from './../../../shared/component/confirm-dailogue/confirm-dailogue.component';
import { Book } from './../../../model/book';
import { Options } from './../../../model/options';
import { AlertDailogueComponent } from './../../../shared/component/alert-dailogue/alert-dailogue.component';
import { AppConstant } from './../../../shared/constant/app.constant';
import { BookError } from './../../../shared/constant/error.constant';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {

  componentActive = true;
  appForm: FormGroup;
  error: string;
  operationInProgress;
  options: Options[];
  additionInProgress = false;

  constructor(private appService: AppService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store<fromBookStore.State>) { }

  ngOnInit() {
    this.options = this.appService.getOptions();
    this.getErrorFromStore();
    this.getOperationInProgressFromStore();
    this.getActionStatusFromStore();
    this.appForm = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  getErrorFromStore(): void {
    this.store.pipe(select(fromBookStore.getError)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(
      response => this.error = response
    );
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
          this.onBookAdded(response);
        }
      }
    );
  }

  get title(): FormControl {
    return this.appForm.get('title') as FormControl;
  }

  get category(): FormControl {
    return this.appForm.get('category') as FormControl;
  }

  get description(): FormControl {
    return this.appForm.get('description') as FormControl;
  }

  onAdd(): void {
    if (this.appForm.valid) {
      const dialogRef = this.dialog.open(ConfirmDailogueComponent, {
        width: '250px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.additionInProgress = true;
          const book: Book = {
            _id: '',
            title: this.title.value,
            category: this.category.value,
            description: this.description.value
          };
          this.store.dispatch(new fromBookStore.AddBook(book));
        }
      });
    } else {
      this.appService.touchControls(this.appForm);
      this.dialog.open(AlertDailogueComponent, {
        width: '250px',
        disableClose: true
      });
    }
  }

  onBookAdded(value: number) {
    let message = '';
    if (value === 1) {
      this.appForm.reset();
      message = AppConstant.bookAddSuccess;
    } else if (value === -1) {
      message = BookError.addBookFail;
    }
    this.additionInProgress = false;
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
