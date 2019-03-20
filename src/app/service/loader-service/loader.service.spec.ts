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

  it('should issue a load books request', async () => {
    service.loadBooks(2, 0).subscribe();
    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET'
    }, '');
    expect(req.request.url).toBe(environment.api + 'book?pageSize=2&pageIndex=1');
    req.flush({
      books: [
        {
          id: '1',
          title: 'Title 1',
          category: 'Category 1',
          description: 'Description 1'
        },
        {
          id: '2',
          title: 'Title 2',
          category: 'Category 2',
          description: 'Description 2'
        }
      ],
      count: 2
    });
  });

  it('should return an Observable<LoadBookResponse>', async () => {

    service.loadBooks(2, 0)
      .subscribe(response => {
        expect(response.books[0].title).toEqual('Title 1');
        expect(response.books[0].category).toEqual('Category 1');
        expect(response.books[0].description).toEqual('Description 1');
        expect(response.count).toBe(2);
      });

    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET'
    }, '');

    req.flush({
      books: [
        {
          id: '1',
          title: 'Title 1',
          category: 'Category 1',
          description: 'Description 1'
        },
        {
          id: '2',
          title: 'Title 2',
          category: 'Category 2',
          description: 'Description 2'
        }
      ],
      count: 2
    });
  });
});
