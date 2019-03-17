import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {MatSnackBar} from '@angular/material';

import { AppService } from './../../../service/app-service/app.service';

import { ConfirmDailogueComponent } from './../../../shared/component/confirm-dailogue/confirm-dailogue.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  appForm: FormGroup;

  constructor(private appService: AppService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
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
    this.appService.touchControls(this.appForm);
    const dialogRef = this.dialog.open(ConfirmDailogueComponent, {
      width: '250px',
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.onBookAdded();
    });    
  }

  onBookAdded() {
    this.snackBar.open('Book added successfully', '', {
      duration: 2000,
    });
  }

}
