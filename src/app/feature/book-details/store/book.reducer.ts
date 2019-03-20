
import * as fromBookStore from './';
import { AddBookFail, GetOptionsSuccess } from './book.action';

export function reducer(state = fromBookStore.initialState,
    action: fromBookStore.BookAction): fromBookStore.BookState {

    switch (action.type) {

        case fromBookStore.BookActionTypes.GetOptions:

            return {
                ...state,
                error: null,
                operationInProgress: true
            }

        case fromBookStore.BookActionTypes.GetOptionsSuccess:

            return {
                ...state,
                operationInProgress: false,
                options: action.payload
            }

        case fromBookStore.BookActionTypes.GetOptionsFail:

            return {
                ...state,
                operationInProgress: false,
                error: action.payload,
            }

        case fromBookStore.BookActionTypes.GetTotalNumberOfBooks:

            return {
                ...state,
                error: null,
                operationInProgress: action.payload
            }

        case fromBookStore.BookActionTypes.GetTotalNumberOfBooksSuccess:

            return {
                ...state,
                operationInProgress: false,
                count: action.payload
            }

        case fromBookStore.BookActionTypes.GetTotalNumberOfBooksFail:

            return {
                ...state,
                count: 0,
                operationInProgress: false,
                error: action.payload,
            }

        case fromBookStore.BookActionTypes.LoadBook:

            return {
                ...state,
                error: null,
                operationInProgress: true,
                pageSize: action.pageSize,
                pageIndex: action.pageIndex
            }

        case fromBookStore.BookActionTypes.LoadBookSuccess:

            return {
                ...state,
                books: [...state.books, ...action.payload],
                operationInProgress: false,
            }

        case fromBookStore.BookActionTypes.LoadBookFail:

            return {
                ...state,
                books: null,
                error: action.payload,
                operationInProgress: false,
            }

        case fromBookStore.BookActionTypes.AddBook:

            return {
                ...state,
                error: null,
                actionStatus: 0
            }

        case fromBookStore.BookActionTypes.AddBookSuccess:

            return {
                ...state,
                actionStatus: 1
            }

        case fromBookStore.BookActionTypes.AddBookFail:

            return {
                ...state,
                error: action.payload,
                actionStatus: -1
            }

        case fromBookStore.BookActionTypes.DeleteBook:

            return {
                ...state,
                actionStatus: 0
            }

        case fromBookStore.BookActionTypes.DeleteBookSuccess:
            let _books = state.books.filter((item) => item._id !== action._id);
            return {
                ...state,
                books: _books,
                actionStatus: 1
            }

        case fromBookStore.BookActionTypes.DeleteBookFail:

            return {
                ...state,
                actionStatus: -1
            }

        case fromBookStore.BookActionTypes.Reset:

            return {
                ...state,
                error: null,
                actionStatus: 0
            }

        default:
            return state;
    }

}