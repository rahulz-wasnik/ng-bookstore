
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

@Injectable({
    providedIn: 'root'
})
export class BookEffect {

    constructor(private action$: Actions, 
        private router: Router,
        private loaderService: LoaderService,
        private bookManagementService: BookManagementService) {
    }

    @Effect()
    routingTriggered$ = this.action$.pipe(
        ofType('ROUTER_NAVIGATION'),
        map(() => new fromBookStore.ClearError())
    )

    @Effect()
    loadBooks$ = this.action$.pipe(
        ofType(fromBookStore.BookActionTypes.LoadBook),
        mergeMap((action: fromBookStore.LoadBook) => this.loaderService.loadBooks(action.pageSize, action.pageIndex).pipe(
            map(_resp => new fromBookStore.LoadBookSuccess(_resp.books, _resp.count)),
            catchError(error => of(new fromBookStore.LoadBookFail(BookError.loadBookFail)))
        ))
    );

    @Effect()
    addBook$ = this.action$.pipe(
        ofType(fromBookStore.BookActionTypes.AddBook),
        mergeMap((action: fromBookStore.AddBook)  => this.bookManagementService.add(action.payload).pipe(
            map(response => new fromBookStore.AddBookSuccess(response)),
            catchError(error => of(new fromBookStore.AddBookFail(BookError.addBookFail)))
        ))
    );

}