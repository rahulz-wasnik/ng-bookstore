
// 3rd Party Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Application Modules
import { BookDetailsRoutingModule } from './book-details-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { reducer } from './store/book.reducer';
import { BookEffect } from './store/book.effect';

// Components
import { BookDetailsPageComponent } from './book-details-page/book-details-page.component';
import { BookListingsComponent } from './book-listings/book-listings.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ConfirmDailogueComponent } from './../../shared/component/confirm-dailogue/confirm-dailogue.component';

@NgModule({
  imports: [
    CommonModule,
    BookDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('book', reducer),
    EffectsModule.forFeature([BookEffect])
  ],
  entryComponents: [
    ConfirmDailogueComponent
  ],
  declarations: [
    BookDetailsPageComponent,
    BookListingsComponent,
    AddBookComponent
  ]
})
export class BookDetailsModule { }
