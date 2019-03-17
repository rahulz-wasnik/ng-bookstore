import * as frombookStore from './book.state';
import * as fromRootStoreState from './../../../store';

export interface State extends fromRootStoreState.State {
    book: frombookStore.BookState
}

export * from './book.selector';
export * from './book.action';
export * from './book.state';