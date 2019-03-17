
// 3rd Party Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Application Modules
import { BookDetailsRoutingModule } from './book-details-routing.module';
import { SharedModule } from './../../shared/shared.module';

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
    ReactiveFormsModule
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
