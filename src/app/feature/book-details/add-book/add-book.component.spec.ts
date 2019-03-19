import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { TestStore } from './../../../store/mock.store';
import * as fromBookStore from '../store';
import { Book } from './../../../model/book';


class MockMatDailog {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

class MockMatSnackBar {

}

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let store: TestStore<fromBookStore.BookState>;
  let appService: AppService;
  let matDialog: MockMatDailog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookComponent],
      providers: [
        AppService,
        { provide: MatDialog, useClass: MockMatDailog },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: Store, useClass: TestStore }
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
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    store.setState(fromBookStore.initialState);
  });

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
    spyOn(matDialog, 'open').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
    component.onAdd();
    expect(matDialog.open).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromBookStore.AddBook(Object.assign(new Book(), component.appForm.value));
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

  it('should call the onAdd function when the Add button is clicked', async(() => {
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
