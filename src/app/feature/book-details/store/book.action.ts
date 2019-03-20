
import { Action } from '@ngrx/store';
import { Book } from './../../../model/book';
import { Options } from './../../../model/options';

export enum BookActionTypes {
    GetOptions = '[Book] Get options',
    GetOptionsSuccess = '[Book] Get options success',
    GetOptionsFail = '[Book] Get options fail',
    GetTotalNumberOfBooks = '[Book] Get Total Number Of Books',
    GetTotalNumberOfBooksSuccess = '[Book] Get Total Number Of Books Success',
    GetTotalNumberOfBooksFail = '[Book] Get Total Number Of Books Fail',
    LoadBook = '[Book] Load Book',
    LoadBookSuccess = '[Book] Load Book Success',
    LoadBookFail = '[Book] Load Book Fail',    
    AddBook = '[Book] Add Book',
    AddBookSuccess = '[Book] Add Book Success',
    AddBookFail = '[Book] Add Book Fail',
    Reset = '[Book] Reset',
    DeleteBook = '[Book] Delete Book',
    DeleteBookSuccess = '[Book] Delete Book Success',
    DeleteBookFail = '[Book] Delete Book Fail',
}

export class GetOptions implements Action {
    readonly type = BookActionTypes.GetOptions;
}

export class GetOptionsSuccess implements Action {
    readonly type = BookActionTypes.GetOptionsSuccess;
    constructor(public payload: Options[]) {}
}

export class GetOptionsFail implements Action {
    readonly type = BookActionTypes.GetOptionsFail;
    constructor(public payload: string) {}
}

export class GetTotalNumberOfBooks implements Action {
    readonly type = BookActionTypes.GetTotalNumberOfBooks;
    constructor(public payload: boolean) {}
}

export class GetTotalNumberOfBooksSuccess implements Action {
    readonly type = BookActionTypes.GetTotalNumberOfBooksSuccess;
    constructor(public payload: number) {}
}

export class GetTotalNumberOfBooksFail implements Action {
    readonly type = BookActionTypes.GetTotalNumberOfBooksFail;
    constructor(public payload: string) {}
}

export class LoadBook implements Action {
    readonly type = BookActionTypes.LoadBook;
    constructor(public pageSize: number, public pageIndex: number) {}
}

export class LoadBookSuccess implements Action {
    readonly type = BookActionTypes.LoadBookSuccess;
    constructor(public payload: Book[]) {}
}

export class LoadBookFail implements Action {
    readonly type = BookActionTypes.LoadBookFail;
    constructor(public payload: string) {}
}

export class AddBook implements Action {
    readonly type = BookActionTypes.AddBook;
    constructor(public payload: Book) {}
}

export class AddBookSuccess implements Action {
    readonly type = BookActionTypes.AddBookSuccess;
    constructor(public payload: Book) {}
}

export class AddBookFail implements Action {
    readonly type = BookActionTypes.AddBookFail;
    constructor(public payload: string) {}
}

export class DeleteBook implements Action {
    readonly type = BookActionTypes.DeleteBook
    constructor(public payload: string) {}
}

export class DeleteBookSuccess implements Action {
    readonly type = BookActionTypes.DeleteBookSuccess
    constructor(public _id: string) {}
}

export class DeleteBookFail implements Action {
    readonly type = BookActionTypes.DeleteBookFail
}

export class Reset implements Action {
    readonly type = BookActionTypes.Reset;
}

export type BookAction = LoadBook | LoadBookSuccess | LoadBookFail | 
    AddBook | AddBookSuccess | AddBookFail | 
    DeleteBook | DeleteBookSuccess | DeleteBookFail |
    Reset | 
    GetTotalNumberOfBooks | GetTotalNumberOfBooksSuccess | GetTotalNumberOfBooksFail |
    GetOptions | GetOptionsSuccess | GetOptionsFail
