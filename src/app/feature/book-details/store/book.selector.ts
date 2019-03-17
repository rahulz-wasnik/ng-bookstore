
import * as fromBookStore from './';

import { createFeatureSelector, createSelector } from '@ngrx/store';

const getBookFeatureState = createFeatureSelector<fromBookStore.BookState>('book');

export const getBooks = createSelector(
    getBookFeatureState,
    state => state.books
);

export const getError = createSelector(
    getBookFeatureState,
    state => state.error
);

export const getOperationInProgress = createSelector(
    getBookFeatureState,
    state => state.operationInProgress
);

export const getCount = createSelector(
    getBookFeatureState,
    state => state.count
);