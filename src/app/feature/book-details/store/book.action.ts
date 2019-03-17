
import { Action } from '@ngrx/store';
import { Book } from './../../../model/book';


export enum BookActionTypes {
    LoadBook = '[Book] Load Book',
    LoadBookSuccess = '[Book] Load Book Success',
    LoadBookFail = '[Book] Load Book Fail',    
    AddBook = '[Book] Add Book',
    AddBookSuccess = '[Book] Add Book Success',
    AddBookFail = '[Book] Add Book Fail',
}

export class LoadBook implements Action {
    readonly type = BookActionTypes.LoadBook
    constructor(public pageSize: number, public pageIndex: number) {}
}

export class LoadBookSuccess implements Action {
    readonly type = BookActionTypes.LoadBookSuccess
    constructor(public payload: Book[], public count: number) {}
}

export class LoadBookFail implements Action {
    readonly type = BookActionTypes.LoadBookFail
    constructor(public payload: string) {}
}

export class AddBook implements Action {
    readonly type = BookActionTypes.AddBook
    constructor(public payload: Book) {}
}

export class AddBookSuccess implements Action {
    readonly type = BookActionTypes.AddBookSuccess
    constructor(public payload: Book) {}
}

export class AddBookFail implements Action {
    readonly type = BookActionTypes.AddBookFail
    constructor(public payload: string) {}
}

export type BookAction = LoadBook | LoadBookSuccess | LoadBookFail | 
    AddBook | AddBookSuccess | AddBookFail |
