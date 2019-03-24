import { Injectable } from '@angular/core';
import { Resolve,  ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, skipWhile, catchError } from 'rxjs/operators'
import { Store, select } from '@ngrx/store';

import { LoaderService } from './../../service/loader-service/loader.service';
import * as fromBookStore from './store';
import { Options } from './../../model/options';

@Injectable({
    providedIn: 'root'
})
export class LoadOptionResolver implements Resolve<any> {

    constructor(private store: Store<fromBookStore.State>) { }

    waitForDataToLoad(): Observable<any> {
        return this.store.pipe(select(fromBookStore.getOptions)).pipe(
            skipWhile(data => data.length == 0),
            take(1)
        );
    }

    resolve(): Observable<any> | Observable<never> {
        this.store.dispatch(new fromBookStore.GetOptions());
        return this.waitForDataToLoad();
    }
}