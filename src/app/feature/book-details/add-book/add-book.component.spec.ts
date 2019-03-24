import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { AddBookComponent } from './add-book.component';
import { AppService } from './../../../service/app-service/app.service';
import { Store } from '@ngrx/store';
import { MockStore } from './../../../store/mock.store';
import * as fromBookStore from '../store';
import { AppConstant } from './../../../shared/constant/app.constant';
import { Book } from './../../../model/book';


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

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let store: MockStore<fromBookStore.BookState>;
  let appService: AppService;
  let matDialog: MockMatDailog;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookComponent],
      providers: [
        AppService,
        { provide: MatDialog, useClass: MockMatDailog },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: Store, useClass: MockStore }
      ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    appService = TestBed.get(AppService);
    matDialog = TestBed.get(MatDialog);
    snackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    store.setState(fromBookStore.initialState);
  });

  it('should initialize to capture events from the store', () => {
    spyOn(component, 'getErrorFromStore').and.callThrough();
    spyOn(component, 'getActionStatusFromStore').and.callThrough();
    component.ngOnInit();
    expect(component.getErrorFromStore).toHaveBeenCalled();
    expect(component.getActionStatusFromStore).toHaveBeenCalled();
  });

  it('should get the error from store', fakeAsync(() => {
    spyOn(store, 'pipe').and.returnValue(of('An error has occured'));
    component.getErrorFromStore();
    expect(store.pipe).toHaveBeenCalled();
    expect(component.error).toBe('An error has occured');
    tick(100);
  }));

  it(`should get actionStatus value from store and call 
    the onBookDeleted method if the book was deleted suceesfull`, fakeAsync(() => {
    spyOn(store, 'pipe').and.returnValue(of(1));
    spyOn(component, 'onBookAdded').and.returnValue(of(1));
    component.getActionStatusFromStore();
    expect(store.pipe).toHaveBeenCalled();
    expect(component.onBookAdded).toHaveBeenCalled();
    tick(100);
  }));

  it('should contain a form with three controls', () => {
    expect(component.appForm.get('title')).toBeTruthy();
    expect(component.appForm.get('category')).toBeTruthy();
    expect(component.appForm.get('description')).toBeTruthy();
  });

  it('should make the title control to be mandatory', () => {
    component.appForm.get('title').setValue('');
    expect(component.appForm.get('title').valid).toBeFalsy();
  });

  it('should make the category control to be mandatory', () => {
    component.appForm.get('category').setValue('');
    expect(component.appForm.get('category').valid).toBeFalsy();
  });

  it('should make the description control to be mandatory', () => {
    component.appForm.get('description').setValue('');
    expect(component.appForm.get('description').valid).toBeFalsy();
  });

  it('should return title control', () => {
    component.appForm.get('title').setValue('Title');
    expect(component.title.value).toBe('Title');
  });

  it('should return category control', () => {
    component.appForm.get('category').setValue('category');
    expect(component.category.value).toBe('category');
  });

  it('should return description control', () => {
    component.appForm.get('description').setValue('description');
    expect(component.description.value).toBe('description');
  });

  it('should display an alert if values for all the mandatory fields have not been provided', () => {
    spyOn(appService, 'touchControls').and.callThrough();
    spyOn(matDialog, 'open').and.callThrough();
    component.onAdd();
    expect(appService.touchControls).toHaveBeenCalledWith(component.appForm);
    expect(matDialog.open).toHaveBeenCalled();
  });

  it('should trigger an add book action', () => {
    component.appForm.get('title').setValue('Title');
    component.appForm.get('category').setValue('category');
    component.appForm.get('description').setValue('description');
    const book: Book = {
      _id: '',
      title:  component.appForm.get('title').value,
      category:  component.appForm.get('category').value,
      description:  component.appForm.get('description').value
    }
    spyOn(matDialog, 'open').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
    component.onAdd();
    expect(matDialog.open).toHaveBeenCalled();
    expect(component.additionInProgress).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromBookStore.AddBook(book));
  });

  it('should open a snackbar with a confirmation message and clear the form fields', () => {
    component.appForm.get('title').setValue('Title');
    component.appForm.get('category').setValue('category');
    component.appForm.get('description').setValue('description');
    fixture.detectChanges();
    spyOn(snackBar, 'open').and.callThrough();
    component.onBookAdded(1);
    expect(snackBar.open).toHaveBeenCalled();
    expect(component.additionInProgress).toBeFalsy();
    expect(component.appForm.get('title').value).toBe(null);
    expect(component.appForm.get('category').value).toBe(null);
    expect(component.appForm.get('category').value).toBe(null);
  });

  it('should open a snackbar with a error message and not clear the form fields', () => {
    component.appForm.get('title').setValue('Title');
    component.appForm.get('category').setValue('category');
    component.appForm.get('description').setValue('description');
    fixture.detectChanges();
    spyOn(snackBar, 'open').and.callThrough();
    component.onBookAdded(-1);
    expect(snackBar.open).toHaveBeenCalled();
    expect(component.additionInProgress).toBeFalsy();
    expect(component.appForm.get('title').value).toBe('Title');
    expect(component.appForm.get('category').value).toBe('category');
    expect(component.appForm.get('description').value).toBe('description');
  });

  it('should display a title field when the page is loaded', () => {
    expect(fixture.debugElement.query(By.css('#title'))).toBeTruthy();
  });

  it('should display a category field when the page is loaded', () => {
    expect(fixture.debugElement.query(By.css('#category'))).toBeTruthy();
  });

  it('should display a description field when the page is loaded', () => {
        expect(fixture.debugElement.query(By.css('#description'))).toBeTruthy();
  });

  it('should display an error when the title field is touched and is left empty', () => {
    component.appForm.get('title').markAsTouched();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.mat-error')).nativeElement.textContent).toContain('Please enter a title');
  });

  it('should display an error when the category field is touched and is left empty', () => {
    component.appForm.get('category').markAsTouched();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.mat-error')).nativeElement.textContent).toContain('Please choose a category');
  });

  it('should display an error when the description field is touched and is left empty', () => {
    component.appForm.get('description').markAsTouched();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.mat-error')).nativeElement.textContent).toContain('Please enter a description');
  });

  it('should call the onAdd event when the Add button is clicked', async(() => {
    spyOn(component, 'onAdd');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.onAdd).toHaveBeenCalled();
    });
  }));

  it('should display the error message when a error occurs', async(() => {
    spyOn(store, 'pipe').and.returnValue(of('Error occured while adding the book'));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.mat-error')).nativeElement.textContent).toContain('Error occured while adding the book');
    });
  }));
  
});
