
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromBookStore from './store';

import { LoaderService } from './../../service/loader-service/loader.service';

@Injectable({
    providedIn: 'root'
})
export class LoadBookResolver implements Resolve<any> {

    constructor(private loaderService: LoaderService,
        private store: Store<fromBookStore.State>) {}

    resolve(): Observable<any> {
        this.store.dispatch(new fromBookStore.LoadBook(fromBookStore.initialState.pageSize,
            fromBookStore.initialState.pageIndex));
        return of();
    }

}