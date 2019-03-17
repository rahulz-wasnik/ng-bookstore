
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromBookStore from './';
import { LoaderService } from './../../../service/loader-service/loader.service';
import { RouteConstant } from './../../../shared/constant/route.constant';
import { BookManagementService } from './../../../service/book-management-service/book-management.service';

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
    loadBooks$ = this.action$.pipe(
        ofType(fromBookStore.BookActionTypes.LoadBook),
        mergeMap((action: fromBookStore.LoadBook) => this.loaderService.load(action.pageSize, action.pageIndex).pipe(
            map(_resp => new fromBookStore.LoadBookSuccess(_resp.books, _resp.count)),
            catchError(error => of(new fromBookStore.LoadBookFail('Unable to load books. Please try again later.')))
        ))
    );

    @Effect()
    addBook$ = this.action$.pipe(
        ofType(fromBookStore.BookActionTypes.AddBook),
        mergeMap((action: fromBookStore.AddBook)  => this.bookManagementService.add(action.payload).pipe(
            map(response => new fromBookStore.AddBookSuccess(response)),
            catchError(error => of(new fromBookStore.AddBookFail('Unable to add this book to our collection. Please try again later')))
        ))
    );

}