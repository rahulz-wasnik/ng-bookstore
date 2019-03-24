
import { Book } from './../../../model/book';
import { Options } from './../../../model/options';

export interface BookState {
    options: Options[],
    books: Book[];
    error: string;
    operationInProgress: boolean;
    count: number;
    actionStatus: number;
}

export const initialState: BookState = {
    options: [],
    books: [],
    error: null,
    operationInProgress: false,
    count: 0,
    actionStatus: 0,
}