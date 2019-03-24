import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpRequest } from '@angular/common/http';

import { BookManagementService } from './book-management.service';
import { Book } from './../../model/book';
import { environment } from './../../../environments/environment';

describe('BookManagementService', () => {

  let httpTestingController: HttpTestingController;
  let service: BookManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookManagementService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(BookManagementService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([BookManagementService], (service: BookManagementService) => {
    expect(service).toBeTruthy();
  }));

  it('should add a book and return the Observable<Book> with a unique id', async () => {
    const book: Book = {
      _id: '',
      title:  'Title',
      category:  'Category',
      description:  'Description'
    }
    service.add(book)
      .subscribe(response => {
        expect(response._id).toBe('1');
      });

    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'POST'
    }, '');

    expect(req.request.url).toContain('book/add');

    req.flush({
      _id: '1',
      title: 'Title',
      category: 'Category',
      description: 'Description'
    });
  });

  it('should issue a delete request with a unique id', async () => {

    service.delete('1').subscribe();

    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'DELETE'
    }, '');

    expect(req.request.url).toContain('book/delete/1');

    req.flush({
      _id: '1'
    });
  });
});
