import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application files
import { RouteConstant } from './../../shared/constant/route.constant';

// Components
import { BookDetailsPageComponent } from './book-details-page/book-details-page.component';
import { BookListingsComponent } from './book-listings/book-listings.component';
import { AddBookComponent } from './add-book/add-book.component';
import { LoadOptionResolver } from './load-options.resolver';

const routes: Routes = [
  {
    path: '', component: BookDetailsPageComponent, children: [
      { path: RouteConstant.listings, component: BookListingsComponent },
      { path: RouteConstant.add, component: AddBookComponent },
      { path: '', redirectTo: RouteConstant.listings, pathMatch: 'full' },
      { path: '**', redirectTo: RouteConstant.listings, pathMatch: 'full' }
    ],
    resolve: { optionsData: LoadOptionResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookDetailsRoutingModule { }
