import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromBookStore from "../store";

@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrls: ['./book-details-page.component.scss']
})
export class BookDetailsPageComponent implements OnInit {

  constructor(private store: Store<fromBookStore.State>) { }

  ngOnInit() {
    this.store.dispatch(new fromBookStore.GetOptions());
  }

}
