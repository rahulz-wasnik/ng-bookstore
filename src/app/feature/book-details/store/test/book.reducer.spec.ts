
import { Action } from '@ngrx/store';

import * as fromBookStore from '../';
import { reducer } from './../book.reducer';


describe('Book reducer', () => {
    let fakeError = 'An error has occured';
    let fakeOptions = [{
        label: 'History',
        value: 'ca_1'
    }];
    let fakeBooks = [{
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

    it('should set error when GetOptions action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.error = 'Error'; 
        const newState = reducer(oldState, new fromBookStore.GetOptions());
        expect(newState.error).toBe(null);
    });

    it('should set options and reset error when GetOptionsSuccess action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        const newState = reducer(oldState, new fromBookStore.GetOptionsSuccess(fakeOptions));
        expect(newState.options).toBe(fakeOptions);
    });

    it('should set error and reset the options when GetOptionsFail action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.options = fakeOptions;
        const newState = reducer(oldState, new fromBookStore.GetOptionsFail(fakeError));
        expect(newState.error).toBe(fakeError);
        expect(newState.options.length).toBe(0);
    });

    it('should set reset error and operationInProgress to true when GetTotalNumberOfBooks action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.error = fakeError;
        const newState = reducer(oldState, new fromBookStore.GetTotalNumberOfBooks(true));
        expect(newState.error).toBe(null);
        expect(newState.operationInProgress).toBeTruthy();
    });

    it(`should set count value and operationInProgress to true if there are no books in current state
        when GetTotalNumberOfBooksSuccess action is dispatched`, () => {
        let oldState = fromBookStore.initialState;
        const newState = reducer(oldState, new fromBookStore.GetTotalNumberOfBooksSuccess(3));
        expect(newState.count).toBe(3);
        expect(newState.operationInProgress).toBeTruthy();
    });

    it(`should set count value and operationInProgress to false if there are in current state
        when GetTotalNumberOfBooksSuccess action is dispatched`, () => {
        let oldState = fromBookStore.initialState;
        oldState.books = fakeBooks;
        const newState = reducer(oldState, new fromBookStore.GetTotalNumberOfBooksSuccess(3));
        expect(newState.count).toBe(3);
        expect(newState.operationInProgress).toBeFalsy();
    });

    it('should set error and reset operationInProgress and count when GetTotalNumberOfBooksFail action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.count = 20;
        oldState.operationInProgress = true;
        const newState = reducer(oldState, new fromBookStore.GetTotalNumberOfBooksFail(fakeError));
        expect(newState.error).toBe(fakeError);
        expect(newState.count).toBe(0);
        expect(newState.operationInProgress).toBeFalsy();
    });

    it('should set error and reset operationInProgress and count when GetTotalNumberOfBooksFail action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.count = 20;
        oldState.operationInProgress = true;
        const newState = reducer(oldState, new fromBookStore.GetTotalNumberOfBooksFail(fakeError));
        expect(newState.error).toBe(fakeError);
        expect(newState.count).toBe(0);
        expect(newState.operationInProgress).toBeFalsy();
    });

    it('should set reset error and operationInProgress to true when LoadBook action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.error = fakeError;
        const newState = reducer(oldState, new fromBookStore.LoadBook(2, 1));
        expect(newState.error).toBe(null);
        expect(newState.operationInProgress).toBeTruthy();
    });

    it('should set books and reset error and operationInProgress when LoadBookSuccess action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.operationInProgress = true;
        const newState = reducer(oldState, new fromBookStore.LoadBookSuccess(fakeBooks));
        expect(newState.books).toBe(fakeBooks);
        expect(newState.operationInProgress).toBeFalsy();
    });

    it('should set error and reset the books when LoadBookFail action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.books = fakeBooks;
        oldState.operationInProgress = true;
        const newState = reducer(oldState, new fromBookStore.LoadBookFail(fakeError));
        expect(newState.error).toBe(fakeError);
        expect(newState.books.length).toBe(0);
        expect(newState.operationInProgress).toBeFalsy();
    });

    it('should set actionStatus and reset error when AddBook action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.actionStatus = 1;
        const newState = reducer(oldState, new fromBookStore.AddBook(fakeBooks[0]));
        expect(newState.actionStatus).toBe(0);
    });

    it('should set actionStatus and reset error when AddBookSuccess action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.actionStatus = 0;
        const newState = reducer(oldState, new fromBookStore.AddBookSuccess(fakeBooks[0]));
        expect(newState.actionStatus).toBe(1);
    });

    it('should set actionStatus and error when AddBook action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.actionStatus = 0;
        const newState = reducer(oldState, new fromBookStore.AddBookFail(fakeError));
        expect(newState.actionStatus).toBe(-1);
        expect(newState.error).toBe(fakeError);
    });

    it('should set actionStatus and reset error when DeleteBook action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.error = fakeError;
        oldState.actionStatus = 1;
        const newState = reducer(oldState, new fromBookStore.DeleteBook('100'));
        expect(newState.actionStatus).toBe(0);
        expect(newState.error).toBe(null);
    });

    it('should set books and actionStatus when DeleteBookSuccess action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.books = fakeBooks;
        oldState.actionStatus = 0;
        const newState = reducer(oldState, new fromBookStore.DeleteBookSuccess('1'));
        expect(newState.actionStatus).toBe(1);
        expect(newState.books.length).toBe(1);
    });

    it('should set actionStatus and error when DeleteBookFail action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.actionStatus = 0;
        const newState = reducer(oldState, new fromBookStore.DeleteBookFail(fakeError));
        expect(newState.actionStatus).toBe(-1);
        expect(newState.error).toBe(fakeError);
    });

    it('should set actionStatus and error when DeleteBookFail action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.actionStatus = 0;
        const newState = reducer(oldState, new fromBookStore.DeleteBookFail(fakeError));
        expect(newState.actionStatus).toBe(-1);
        expect(newState.error).toBe(fakeError);
    });

    it('should set actionStatus and error when DeleteBookFail action is dispatched', () => {
        let oldState = fromBookStore.initialState;
        oldState.actionStatus = 1;
        oldState.error = fakeError;
        oldState.count = 10;
        oldState.books = fakeBooks;
        const newState = reducer(oldState, new fromBookStore.Reset());
        expect(newState.actionStatus).toBe(0);
        expect(newState.error).toBe(null);
        expect(newState.books.length).toBe(0);
        expect(newState.count).toBe(0);
    });

    it('should return the default state', () => {
        const action = { type: 'MOCK' } as any;
        const result = reducer(undefined, action);
    
        expect(result).toBe(fromBookStore.initialState);
      });
});
