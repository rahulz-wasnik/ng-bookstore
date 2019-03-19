import {hot} from 'jasmine-marbles';
import { of } from 'rxjs';
import {Actions} from '@ngrx/effects';

import { BookEffect } from './../book.effect';
import * as fromBookStore from "../";
import { LoadBookResponse } from './../../../../model/load-books-response';

describe('load effect', () => {

  it('should work with effects that only use observables', () => {
    const response = new LoadBookResponse();
    const actions = new Actions(hot('-a-|', {a: {type: fromBookStore.BookActionTypes.LoadBook}}));
    const service = stubLoaderService(response);
    const effects = new BookEffect(actions, service);

    expect(effects.loadBooks$).toBeObservable(hot('-b|', {b: {type: fromBookStore.BookActionTypes.LoadBookSuccess}}));
  });

//   // async await rocks!
//   it('should work with any effects', async () => {
//     const actions = new Actions(hot('-a-|', {a: {type: 'START'}}));
//     const service = stubService('expected');
//     const effects = new AppEffects(actions, service);

//     expect(await readAll(effects.someOtherEffect$)).toEqual([
//       {type: 'END', payload: 'expected'}
//     ]);
//   });

  function stubLoaderService(response: any): any {
    const service = jasmine.createSpyObj('loaderService', ['loadCategories', 'loadBooks']);
    service.loadCategories.and.returnValue(of(response));
    service.loadBooks.and.returnValue(of(response));
    return service;
  }
});

// extract into utils file
// export function readAll<T>(o: Observable<T>): Promise<T[]> {
//   return toPromise.call(toArray.call(o));
// }