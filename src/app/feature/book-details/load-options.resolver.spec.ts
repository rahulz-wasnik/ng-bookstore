import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookDetailsPageComponent } from './book-details-page/book-details-page.component';
import { MockStore } from './../../store/mock.store';
import * as fromBookStore from './store';

import { RouteConstant } from './../../shared/constant/route.constant';
import { HomePageComponent } from './../home/home-page/home-page.component';
import { BookListingsComponent } from './book-listings/book-listings.component';
import { AddBookComponent } from './add-book/add-book.component';
import { LoadOptionResolver } from './load-options.resolver';


describe('BookDetailsPageComponent', () => {
  let fixture: ComponentFixture<BookDetailsPageComponent>;
  let resolver: LoadOptionResolver;
  let store: MockStore<fromBookStore.BookState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: RouteConstant.book, component: BookDetailsPageComponent, resolve: { optionsData: of(2) } },
          { path: RouteConstant.book + '/' + RouteConstant.listings, component: BookListingsComponent },
          { path: RouteConstant.book + '/' + RouteConstant.add, component: AddBookComponent },
          { path: '', redirectTo: RouteConstant.book, pathMatch: 'full' },
          { path: '**', redirectTo: RouteConstant.book, pathMatch: 'full' },
        ])
      ],
      declarations: [BookDetailsPageComponent, HomePageComponent, BookListingsComponent, AddBookComponent],
      providers: [
        LoadOptionResolver,
        { provide: Store, useClass: MockStore }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    resolver = TestBed.get(LoadOptionResolver);
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(resolver).toBeTruthy();
  });

  it('should fetch options from the store', () => {
    spyOn(store, 'pipe').and.callThrough()
    resolver.waitForDataToLoad();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('should dispatch an GetOptions action and wait for data to load', () => {
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(resolver, 'waitForDataToLoad').and.callThrough();
    resolver.resolve();
    expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.GetOptions());
    expect(resolver.waitForDataToLoad).toHaveBeenCalled();
  });

});
