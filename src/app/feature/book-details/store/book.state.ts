
import { Book } from './../../../model/book';

export interface BookState {
    books: Book[];
    error: string;
    pageSize: number;
    pageIndex: number;
    operationInProgress: boolean;
    count: number;
}

export const initialState: BookState = {
    books: [],
    error: null,
    operationInProgress: false,
    pageSize: 2,
    pageIndex: 0,
    count: 0
}