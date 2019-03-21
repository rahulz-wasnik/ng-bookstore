
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError, tap, mapTo } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromBookStore from './';
import { LoaderService } from './../../../service/loader-service/loader.service';
import { RouteConstant } from './../../../shared/constant/route.constant';
import { BookManagementService } from './../../../service/book-management-service/book-management.service';
import { BookError } from './../../../shared/constant/error.constant';
import { ErrorHandlerService } from './../../../service/error-handler/error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class BookEffect {

    constructor(private action$: Actions,
        private loaderService: LoaderService,
        private bookManagementService: BookManagementService, private errorHandlerService: ErrorHandlerService) {
    }

    @Effect()
    routingTriggered$ = this.action$.pipe(
        ofType('ROUTER_NAVIGATION'),
        map(() => new fromBookStore.Reset())
    );

    @Effect()
    getOptions$ = this.action$.pipe(
        ofType(fromBookStore.BookActionTypes.GetOptions),
        mergeMap(() => 
            this.loaderService.getOptions().pipe(
            map(_resp => new fromBookStore.GetOptionsSuccess(_resp)),
            catchError((error) => {
                this.errorHandlerService.handleError(error);
                return of(new fromBookStore.GetTotalNumberOfBooksFail(BookError.getOptionsFail));
            }))
        ));

    @Effect()
    getTotalNumberOfBooks$ = this.action$.pipe(
        ofType(fromBookStore.BookActionTypes.GetTotalNumberOfBooks),
        mergeMap(() => 
            this.loaderService.getTotalNumberOfBooks().pipe(
            map(_resp => new fromBookStore.GetTotalNumberOfBooksSuccess(_resp)),
            catchError((error) => {
                this.errorHandlerService.handleError(error);
                return of(new fromBookStore.GetTotalNumberOfBooksFail(BookError.loadBookFail));
            }))
        ));

    @Effect()
    loadBooks$ = this.action$.pipe(
        ofType(fromBookStore.BookActionTypes.LoadBook),
        mergeMap((action: fromBookStore.LoadBook) => this.loaderService.loadBooks(action.pageSize, action.pageIndex).pipe(
            map(_resp => new fromBookStore.LoadBookSuccess(_resp)),
            catchError((error) => {
                this.errorHandlerService.handleError(error);
                return of(new fromBookStore.LoadBookFail(BookError.loadBookFail));
            }))
        ));


    @Effect()
    addBook$ = this.action$.pipe(
        ofType(fromBookStore.BookActionTypes.AddBook),
        mergeMap((action: fromBookStore.AddBook) => this.bookManagementService.add(action.payload).pipe(
            map(response => new fromBookStore.AddBookSuccess(response)),
            catchError((error) => {
                this.errorHandlerService.handleError(error);
                return of(new fromBookStore.AddBookFail(BookError.addBookFail));
            }))
        ));

    @Effect()
    deleteBook$ = this.action$.pipe(
        ofType(fromBookStore.BookActionTypes.DeleteBook),
        mergeMap((action: fromBookStore.DeleteBook)  => this.bookManagementService.delete(action.payload).pipe(
            map(response => new fromBookStore.DeleteBookSuccess(response)),
            catchError((error) => {
                this.errorHandlerService.handleError(error);
                return of(new fromBookStore.DeleteBookFail());
            }))
        ));
}