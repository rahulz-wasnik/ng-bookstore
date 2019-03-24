

import { hot, cold } from 'jasmine-marbles';

import * as fromBookStore from '../';
import { reducer } from './../book.reducer';
import { BookManagementService } from './../../../../service/book-management-service/book-management.service';
import { LoaderService } from './../../../../service/loader-service/loader.service';
import { BookEffect } from './../book.effect';
import { ErrorHandlerService } from './../../../../service/error-handler/error-handler.service';
import { throwError, of, Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Book } from './../../../../model/book';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookError } from './../../../../shared/constant/error.constant';


describe('Book reducer', () => { 

    let actions: Observable<any>;
    
      let effect: BookEffect;
      let bookManagementService: BookManagementService;
      let loaderService: LoaderService;

    const fakeOptions = [{
        label: 'History',
        value: 'ca_1'
    }];
    const fakeBooks = [{
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
    }];

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule
          ],  
          providers: [
            BookEffect,
            LoaderService,
            BookManagementService,
            ErrorHandlerService,
            provideMockActions(() => actions)
          ]
        }).compileComponents();
    
        effect = TestBed.get(BookEffect);
        loaderService = TestBed.get(LoaderService);
        bookManagementService = TestBed.get(BookManagementService);
      });

    it('should dispatch GetOptionsSuccess action when the GetOptions action returns success', () => {
        const action = new fromBookStore.GetOptions();
        const outcome = new fromBookStore.GetOptionsSuccess(fakeOptions);
        
        actions = hot('-a', {a: action});
        const response = cold('-a|', { a: fakeOptions});
        spyOn(loaderService, 'getOptions').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.getOptions$).toBeObservable(expected);
    });

    it('should dispatch GetOptionsFail action when the GetOptions action returns error', () => {
        const action = new fromBookStore.GetOptions();
        const outcome = new fromBookStore.GetOptionsFail(BookError.getOptionsFail);
        
        actions = hot('-a', {a: action});
        const response = cold('-#|', {}, BookError.getOptionsFail);
        spyOn(loaderService, 'getOptions').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.getOptions$).toBeObservable(expected);
    });

    it('should dispatch GetTotalNumberOfBooksSuccess action when the GetTotalNumberOfBooks action returns success', () => {
        const action = new fromBookStore.GetTotalNumberOfBooks(true);
        const outcome = new fromBookStore.GetTotalNumberOfBooksSuccess(2);
        
        actions = hot('-a', {a: action});
        const response = cold('-a|', { a: 2});
        spyOn(loaderService, 'getTotalNumberOfBooks').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.getTotalNumberOfBooks$).toBeObservable(expected);
    });

    it('should dispatch GetTotalNumberOfBooksFail action when the GetTotalNumberOfBooks action returns error', () => {
        const action = new fromBookStore.GetTotalNumberOfBooks(false);
        const outcome = new fromBookStore.GetTotalNumberOfBooksFail(BookError.loadBookFail);
        
        actions = hot('-a', {a: action});
        const response = cold('-#|', {}, BookError.loadBookFail);
        spyOn(loaderService, 'getTotalNumberOfBooks').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.getTotalNumberOfBooks$).toBeObservable(expected);
    });

    it('should dispatch LoadBookSuccess action when the LoadBook action returns success', () => {
        const action = new fromBookStore.LoadBook(2 ,0);
        const outcome = new fromBookStore.LoadBookSuccess(fakeBooks);
        
        actions = hot('-a', {a: action});
        const response = cold('-a|', { a: fakeBooks});
        spyOn(loaderService, 'loadBooks').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.loadBooks$).toBeObservable(expected);
    });

    it('should dispatch LoadBookFail action when the LoadBook action returns error', () => {
        const action = new fromBookStore.LoadBook(2, 0);
        const outcome = new fromBookStore.LoadBookFail(BookError.loadBookFail);
        
        actions = hot('-a', {a: action});
        const response = cold('-#|', {}, BookError.loadBookFail);
        spyOn(loaderService, 'loadBooks').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.loadBooks$).toBeObservable(expected);
    });

    it('should dispatch AddBookSuccess action when the AddBook action returns success', () => {
        const action = new fromBookStore.AddBook(fakeBooks[0]);
        const outcome = new fromBookStore.AddBookSuccess(fakeBooks[0]);
        
        actions = hot('-a', {a: action});
        const response = cold('-a|', { a: fakeBooks[0]});
        spyOn(bookManagementService, 'add').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.addBook$).toBeObservable(expected);
    });

    it('should dispatch AddBookFail action when the AddBook action returns error', () => {
        const action = new fromBookStore.AddBook(fakeBooks[0]);
        const outcome = new fromBookStore.AddBookFail(BookError.addBookFail);
        
        actions = hot('-a', {a: action});
        const response = cold('-#|', {}, BookError.addBookFail);
        spyOn(bookManagementService, 'add').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.addBook$).toBeObservable(expected);
    });

    it('should dispatch DeleteBookSuccess action when the DeleteBook action returns success', () => {
        const action = new fromBookStore.DeleteBook('100');
        const result = JSON.stringify({_id: '100'});
        const outcome = new fromBookStore.DeleteBookSuccess(result);
        
        actions = hot('-a', {a: action});
        const response = cold('-a|', { a: result });
        spyOn(bookManagementService, 'delete').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.deleteBook$).toBeObservable(expected);
    });

    it('should dispatch DeleteBookFail action when the DeleteBook action returns error', () => {
        const action = new fromBookStore.DeleteBook('100');
        const outcome = new fromBookStore.DeleteBookFail(BookError.deleteBookFail);
        
        actions = hot('-a', {a: action});
        const response = cold('-#|', {}, BookError.deleteBookFail);
        spyOn(bookManagementService, 'delete').and.returnValue(response);

        const expected = cold('--b', {b: outcome});
        expect(effect.deleteBook$).toBeObservable(expected);
    });

    
});
