import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromBookStore from './store';

@Injectable({
    providedIn: 'root'
})
export class LoadOptionResolver implements Resolve<any> {

    constructor(private store: Store<fromBookStore.State>) { }

    waitForDataToLoad(): Observable<any> {
        return this.store.pipe(select(fromBookStore.getOptions)).pipe(
            skipWhile(data => data.length === 0),
            take(1)
        );
    }

    resolve(): Observable<any> | Observable<never> {
        this.store.dispatch(new fromBookStore.GetOptions());
        return this.waitForDataToLoad();
    }
}
