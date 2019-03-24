
import { Book } from './../../../model/book';
import { Options } from './../../../model/options';

export interface BookState {
    options: Options[],
    books: Book[];
    error: string;
    pageSize: number;
    pageIndex: number;
    operationInProgress: boolean;
    count: number;
    actionStatus: number;
}

export const initialState: BookState = {
    options: [],
    books: [],
    error: null,
    operationInProgress: false,
    pageSize: 2,
    pageIndex: 0,
    count: 0,
    actionStatus: 0,
}