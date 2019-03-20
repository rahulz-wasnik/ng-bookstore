import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';

import { BookListingsComponent } from './book-listings.component';
import { Store } from '@ngrx/store';
import { MockStore } from './../../../store/mock.store';
import * as fromBookStore from '../store';
import { Book } from './../../../model/book';
import { By } from '@angular/platform-browser';
import { PageEvent } from '@angular/material';

class MockMatDailog {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

class MockMatSnackBar {
  open(message: string, action: string) {

  }
}

describe('BookListingsComponent', () => {
  let component: BookListingsComponent;
  let fixture: ComponentFixture<BookListingsComponent>;
  let store: MockStore<fromBookStore.BookState>;
  let matDialog: MockMatDailog;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookListingsComponent],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: MatDialog, useClass: MockMatDailog },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
      ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule,
        MatPaginatorModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListingsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    matDialog = TestBed.get(MatDialog);
    snackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a action to get the total number of books', () => {
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'pipe').and.returnValue(of(2));
    spyOn(store, 'pipe').and.callFake(() => of(2));
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.GetTotalNumberOfBooks(true));
  });

  it('should get the count for number of books', fakeAsync(() => {
    spyOn(store, 'pipe').and.returnValue(of(2));
    component.ngOnInit();
    
    expect(store.pipe).toHaveBeenCalled();
    expect(component.count).toBe(2);

    tick(100);
  }));

  // it('should dispatch a action to load the books if the count is greater than 0', async(() => {
  //   spyOn(store, 'pipe').and.returnValue(of(2));
  //   spyOn(store, 'dispatch').and.callThrough();
  //   spyOn(store, 'dispatch').and.callFake(() => of());
  //   component.books = [];
  //   component.pageIndex = 1;
  //   component.ngOnInit();
  //   fixture.whenStable().then(() => {
  //     expect(store.pipe).toHaveBeenCalled();
  //     expect(component.count).toBe(2);
  //     expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.LoadBook(2, 1));
  //   })
  // }));

  

  // it('should dispatch the Load Book action if all the books on the current page are deleted', fakeAsync(() => {
  //   const books: Book[] = new Array<Book>();
  //   component.pageIndex = 1;
  //   component.pageSize = 2;

  //   spyOn(store, 'pipe').and.returnValue(of(books));
  //   spyOn(store, 'dispatch').and.callThrough();
  //   component.ngOnInit();

  //   expect(store.pipe).toHaveBeenCalled();
  //   expect(component.pageIndex).toBe(0);
  //   expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.LoadBook(2, 0));

  //   tick(100);
  // }));

  // it('should trigger a LoadBook action when the pageChange event is called', () => {
  //   const event: PageEvent = new PageEvent();
  //   event.pageIndex = 1;
  //   event.pageSize = 2;

  //   spyOn(store, 'dispatch').and.callThrough();
  //   component.onPageChange(event);

  //   expect(component.pageIndex).toBe(1);
  //   expect(component.pageSize).toBe(2);
  //   expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.LoadBook(2, 1));
  // });

  // it('should get the error and display it on the screen', fakeAsync(() => {
  //   const errorMessage = 'Error in fetching the books';

  //   spyOn(store, 'pipe').and.returnValue(of(errorMessage));
  //   component.ngOnInit();
  //   fixture.detectChanges();

  //   expect(store.pipe).toHaveBeenCalled();
  //   expect(component.error).toBe(errorMessage);
  //   expect(fixture.debugElement.query(By.css('.mat-error')).nativeElement.textContent).toBe(errorMessage);

  //   tick(100);
  // }));

  // it('should display the count of books on the screen', () => {
  //   component.count = 2;
  //   component.operationInProgress = false;
  //   component.error = null;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.query(By.css('.mat-card-title')).nativeElement.textContent).toBe('2');
  // });

  // it('should display an appropriate message when there are no books to be displayed', () => {
  //   const books: Book[] = []
  //   component.books = books;
  //   component.operationInProgress = false;
  //   component.error = null;
  //   fixture.detectChanges();

  //   expect(fixture.debugElement.query(By.css('.mat-body-1')).nativeElement.textContent).toContain('No books have been added yet.');
  // });

  // it('should display the books to the user', () => {
  //   const books: Book[] = [
  //     {
  //       _id: '1',
  //       title: 'Title 1',
  //       category: 'Category 1',
  //       description: 'Description 1'
  //     },
  //     {
  //       _id: '2',
  //       title: 'Title 2',
  //       category: 'Category 2',
  //       description: 'Description 2'
  //     }
  //   ]
  //   component.books = books;
  //   component.operationInProgress = false;
  //   component.error = null;
  //   fixture.detectChanges();

  //   expect(fixture.debugElement.queryAll(By.css('mat-panel-title'))[0].nativeElement.textContent).toContain('Title 1');
  //   expect(fixture.debugElement.queryAll(By.css('mat-panel-title'))[1].nativeElement.textContent).toContain('Title 2');
  //   expect(fixture.debugElement.query(By.css('#category0')).nativeElement.textContent).toContain('Category 1');
  //   expect(fixture.debugElement.query(By.css('#category1')).nativeElement.textContent).toContain('Category 2');
  //   expect(fixture.debugElement.query(By.css('#description0')).nativeElement.textContent).toContain('Description 1');
  //   expect(fixture.debugElement.query(By.css('#description1')).nativeElement.textContent).toContain('Description 2');
  // });

  // it('should call the onPageChange event when a selection is made on the paginator', () => {
  //   component.operationInProgress = false;
  //   component.error = null;
  //   component.pageSize = 1;
  //   component.pageIndex = 0;
  //   component.books = [
  //     {
  //       _id: '1',
  //       title: 'Title 1',
  //       category: 'Category 1',
  //       description: 'Description 1'
  //     },
  //     {
  //       _id: '2',
  //       title: 'Title 2',
  //       category: 'Category 2',
  //       description: 'Description 2'
  //     }
  //   ];
  //   component.count = 2;    
  //   component.pageSizeOptions = [1,3,5];
  //   fixture.detectChanges();
  //   spyOn(component, 'onPageChange').and.callThrough();
  //   (fixture.debugElement.queryAll(By.css('button'))[1].nativeElement).click();
  //   expect(component.onPageChange).toHaveBeenCalled();
  // });
});
