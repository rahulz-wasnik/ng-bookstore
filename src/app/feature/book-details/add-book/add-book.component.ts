import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { Store, select } from '@ngrx/store';
import * as fromBookStore from '../store';

import { AppService } from './../../../service/app-service/app.service';
import { Observable } from 'rxjs';

import { ConfirmDailogueComponent } from './../../../shared/component/confirm-dailogue/confirm-dailogue.component';
import { Book } from './../../../model/book';
import { AlertDailogueComponent } from './../../../shared/component/alert-dailogue/alert-dailogue.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  appForm: FormGroup;

  error$: Observable<string>;  

  constructor(private appService: AppService, 
    private dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private store: Store<fromBookStore.State>) { }

  ngOnInit() {
    this.error$ = this.store.pipe(select(fromBookStore.getError));
    this.appForm = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
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
    if(this.appForm.valid) {
      const dialogRef = this.dialog.open(ConfirmDailogueComponent, {
        width: '250px',
        disableClose: true
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.store.dispatch(new fromBookStore.AddBook(Object.assign(new Book(), this.appForm.value)))
        }
        // this.onBookAdded();
      }); 
    } else {
      this.appService.touchControls(this.appForm);
      this.dialog.open(AlertDailogueComponent, {
        width: '250px',
        disableClose: true
      });
    }   
  }

  onBookAdded() {
    this.snackBar.open('Book added successfully', '', {
      duration: 2000,
    });
  }

}
