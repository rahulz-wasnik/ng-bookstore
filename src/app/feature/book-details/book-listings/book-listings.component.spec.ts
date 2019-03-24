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

  it('should initialize to capture events from the store', () => {
    spyOn(component, 'getBooksFromStore').and.callThrough();
    spyOn(component, 'getCountFromStore').and.callThrough();
    spyOn(component, 'getErrorFromStore').and.callThrough();
    spyOn(component, 'getOperationInProgressFromStore').and.callThrough();
    spyOn(component, 'getActionStatusFromStore').and.callThrough();
    component.ngOnInit();
    expect(component.getBooksFromStore).toHaveBeenCalled();
    expect(component.getCountFromStore).toHaveBeenCalled();
    expect(component.getErrorFromStore).toHaveBeenCalled();
    expect(component.getActionStatusFromStore).toHaveBeenCalled();
  });

  it('should get the books from store', fakeAsync(() => {
    const mockData = [
      {
        _id: '100',
        title: 'Title',
        category: 'Category',
        description: 'Description'
      }
    ];
    spyOn(store, 'pipe').and.returnValue(of(mockData));
    component.getBooksFromStore();
    expect(store.pipe).toHaveBeenCalled();
    expect(component.books).toBe(mockData);
    tick(100);
  }));

  it('should dispatch a action to get the total number of books and get the this value from the store', fakeAsync(() => {
    component.books = [
      {
        _id: '100',
        title: 'Title',
        category: 'Category',
        description: 'Description'
      }
    ];
    component.pageSize = 2;
    component.pageIndex = 1;
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'pipe').and.returnValue(of(2));
    component.getCountFromStore();
    expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.GetTotalNumberOfBooks(true));
    expect(store.pipe).toHaveBeenCalled();
    expect(component.count).toBe(2);
    tick(100);
  }));

  it(`should dispatch a load book action when the total number of books is
    greater that 0 and there are no books being displayed on the page`, fakeAsync(() => {
    component.books = [
      {
        _id: '100',
        title: 'Title',
        category: 'Category',
        description: 'Description'
      }
    ];
    component.pageSize = 2;
    component.pageIndex = 1;
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'pipe').and.returnValue(of(2));
    component.getCountFromStore();
    expect(component.count).toBe(2);
    expect(component.pageIndex).toBe(0);
    expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.GetTotalNumberOfBooks(true));
    expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.LoadBook(2, 0));
    tick(100);
  }));

  it('should get the error from store', fakeAsync(() => {
    spyOn(store, 'pipe').and.returnValue(of('An error has occured'));
    component.getErrorFromStore();
    expect(store.pipe).toHaveBeenCalled();
    expect(component.error).toBe('An error has occured');
    tick(100);
  }));

  it('should get operation in progress value from store', fakeAsync(() => {
    spyOn(store, 'pipe').and.returnValue(of(true));
    component.getOperationInProgressFromStore();
    expect(store.pipe).toHaveBeenCalled();
    expect(component.operationInProgress).toBeTruthy();
    tick(100);
  }));

  it(`should get actionStatus value from store and call
    the onBookDeleted method if the book was deleted suceesfully`, fakeAsync(() => {
    component.deletionInProgress = true;
    spyOn(store, 'pipe').and.returnValue(of(1));
    spyOn(component, 'onBookDeleted').and.callThrough();
    component.getActionStatusFromStore();
    expect(store.pipe).toHaveBeenCalled();
    expect(component.deletionInProgress).toBeFalsy();
    expect(component.onBookDeleted).toHaveBeenCalledWith(1);
    tick(100);
  }));

  it('should reset componentActive value', () => {
    component.componentActive = true;
    component.ngOnDestroy();
    expect(component.componentActive).toBeFalsy();
  });

  it(`should display an alert when the user clicks the delete button
      and dispatch a DeleteBook action when the user confirms`, () => {
      spyOn(matDialog, 'open').and.callThrough();
      spyOn(store, 'dispatch').and.callThrough();
      component.onDelete('100');
      expect(matDialog.open).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.DeleteBook('100'));
    });

  it(`should dispatch GetTotalNumberOfBooks action and display
    a confirmation message stating Book deleted successfully`, () => {
      component.deletionInProgress = true;
      spyOn(store, 'dispatch').and.callThrough();
      spyOn(snackBar, 'open').and.callThrough();
      component.onBookDeleted(1);
      expect(snackBar.open).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.GetTotalNumberOfBooks(false));
      expect(component.deletionInProgress).toBeFalsy();
    });

  it('should return the label based on value', () => {
    component.options = [
      {
        label: 'History',
        value: 'ca_1'
      }
    ];
    const label = component.getOptionLabel('ca_1');
    expect(label).toBe('History');
  });

  it('should trigger a LoadBook action when the pageChange event is called', () => {
    const event: PageEvent = new PageEvent();
    event.pageIndex = 1;
    event.pageSize = 2;
    spyOn(store, 'dispatch').and.callThrough();
    component.onPageChange(event);
    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(2);
    expect(store.dispatch).toHaveBeenCalledWith(new fromBookStore.LoadBook(2, 1));
  });

  it('should display error it on the screen', fakeAsync(() => {
    component.error = 'Error in fetching the books';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.mat-error')).nativeElement.textContent).toBe('Error in fetching the books');
    tick(100);
  }));

  it('should display the count of books on the screen', () => {
    component.count = 2;
    component.operationInProgress = false;
    component.error = null;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.mat-card-title')).nativeElement.textContent).toContain('2');
  });

  it('should display an appropriate message when there are no books to be displayed', () => {
    component.count = 0;
    component.operationInProgress = false;
    component.error = null;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.mat-body-1')).nativeElement.textContent).toContain('No books have been added yet.');
  });

  it('should display the books to the user', () => {
    component.books = [
      {
        _id: '1',
        title: 'Title 1',
        category: 'Category 1',
        description: 'Description 1'
      },
      {
        _id: '2',
        title: 'Title 2',
        category: 'Category 2',
        description: 'Description 2'
      }
    ];
    component.operationInProgress = false;
    component.error = null;
    component.count = 2;
    spyOn(component, 'getOptionLabel').and.returnValue('Category 1');
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('mat-panel-title'))[0].nativeElement.textContent).toContain('Title 1');
    expect(fixture.debugElement.query(By.css('#category0')).nativeElement.textContent).toContain('Category 1');
    expect(fixture.debugElement.query(By.css('#description0')).nativeElement.textContent).toContain('Description 1');
  });

  it('should call the onDelete event when a delete button is clicked', () => {
    component.operationInProgress = false;
    component.error = null;
    component.pageSize = 1;
    component.pageIndex = 0;
    component.books = [
      {
        _id: '1',
        title: 'Title 1',
        category: 'Category 1',
        description: 'Description 1'
      },
      {
        _id: '2',
        title: 'Title 2',
        category: 'Category 2',
        description: 'Description 2'
      }
    ];
    component.count = 2;
    component.pageSizeOptions = [1, 3, 5];
    spyOn(component, 'getOptionLabel').and.returnValue('Category 1');
    spyOn(component, 'onDelete').and.callThrough();
    fixture.detectChanges();
    (fixture.debugElement.queryAll(By.css('button'))[1].nativeElement).click();
    expect(component.onDelete).toHaveBeenCalled();
  });

  it('should call the onPageChange event when a selection is made on the paginator', () => {
    component.operationInProgress = false;
    component.error = null;
    component.pageSize = 1;
    component.pageIndex = 0;
    component.books = [
      {
        _id: '1',
        title: 'Title 1',
        category: 'Category 1',
        description: 'Description 1'
      },
      {
        _id: '2',
        title: 'Title 2',
        category: 'Category 2',
        description: 'Description 2'
      }
    ];
    component.count = 2;
    component.pageSizeOptions = [1, 3, 5];
    spyOn(component, 'getOptionLabel').and.returnValue('Category 1');
    spyOn(component, 'onPageChange').and.callThrough();
    fixture.detectChanges();
    (fixture.debugElement.queryAll(By.css('button'))[3].nativeElement).click();
    expect(component.onPageChange).toHaveBeenCalled();
  });

  it('should display progress spinner when posts are loading', () => {
    component.operationInProgress = true;
    component.deletionInProgress = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-progress-spinner')).nativeElement).toBeTruthy();
  });
});
