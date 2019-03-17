
import { Book } from './book';

export interface LoadBookResponse {
    books: Book[];
    count: number;
}