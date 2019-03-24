import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dailogue',
  templateUrl: './confirm-dailogue.component.html',
  styleUrls: ['./confirm-dailogue.component.scss']
})
export class ConfirmDailogueComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmDailogueComponent>) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    this.dialogRef.close(true);
  }
}
