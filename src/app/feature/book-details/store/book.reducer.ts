
import * as fromBookStore from './';
import { AddBookFail } from './book.action';

export function reducer(state = fromBookStore.initialState,
    action: fromBookStore.BookAction): fromBookStore.BookState {

    switch (action.type) {

        case fromBookStore.BookActionTypes.LoadBook:

            return {
                ...state,
                operationInProgress: true,
                pageSize: action.pageSize,
                pageIndex: action.pageIndex
            }

        case fromBookStore.BookActionTypes.LoadBookSuccess:

            return {
                ...state,
                books: [...action.payload],
                count: action.count,
                operationInProgress: false,
                error: null,
            }

        case fromBookStore.BookActionTypes.LoadBookFail:

            return {
                ...state,
                books: null,
                count: 0,
                operationInProgress: false,
                error: action.payload,
            }

        case fromBookStore.BookActionTypes.AddBookSuccess:

            return {
                ...state,
                books: [...state.books, action.payload]
            }

        case fromBookStore.BookActionTypes.AddBookFail:

            return {
                ...state,
                error: action.payload
            }

        case fromBookStore.BookActionTypes.ClearError:

            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}