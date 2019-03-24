import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert-dailogue',
  templateUrl: './alert-dailogue.component.html',
  styleUrls: ['./alert-dailogue.component.scss']
})
export class AlertDailogueComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AlertDailogueComponent>) { }

  ngOnInit() {
  }

  onOk(): void {
    this.dialogRef.close(false);
  }
}
