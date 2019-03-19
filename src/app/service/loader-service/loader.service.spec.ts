import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpRequest } from '@angular/common/http';

import { LoaderService } from './loader.service';
import { LoadBookResponse } from './../../model/load-books-response';
import { Book } from './../../model/book';
import { environment } from './../../../environments/environment';


describe('LoaderService', () => {

  let httpTestingController: HttpTestingController;
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(LoaderService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([LoaderService], (service: LoaderService) => {
    expect(service).toBeTruthy();
  }));

  it('should issue a load books request', async() =>{
    service.loadBooks(2, 0).subscribe();

    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET'
    }, '');

    expect(req.request.url).toBe(environment.api+'book?pageSize=2&pageIndex=1');
    
    req.flush({});
  });

  it('should return an Observable<LoadBookResponse>', async () => {
    const mockResponse = new LoadBookResponse();
    const books = new Array<Book>();
    let book_1 = new Book();
    book_1.title = 'First Title';
    book_1.category = 'First Category';
    book_1.description = 'First Description';
    let book_2 = new Book();
    book_2.title = 'Second Title';
    book_2.category = 'Second Category';
    book_2.description = 'Second Description';
    books.push(book_1);
    books.push(book_2);
    mockResponse.count = 2;
    mockResponse.books = books;

    service.loadBooks(2, 0)
      .subscribe(response => {
        expect(response.books[0].title).toEqual('First Title');
        expect(response.books[0].category).toEqual('First Category');
        expect(response.books[0].description).toEqual('First Description');
        expect(response.count).toBe(2);
      });

    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET'
    }, '');

    req.flush(mockResponse);
  });
});
