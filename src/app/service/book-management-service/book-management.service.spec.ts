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

  it('should issue a add book request', async() =>{
    const book: Book = {
      id: '1',
      title:  'Title',
      category:  'category',
      description:  'description'
    }
    service.add(book).subscribe();

    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'POST'
    }, '');

    expect(req.request.url).toBe(environment.api+'book/add');
    
    req.flush({});
  });

  it('should add a book and return the Observable<Book> with a unique id', async () => {
    const book: Book = {
      id: '',
      title:  'Title',
      category:  'Category',
      description:  'Description'
    }
    service.add(book)
      .subscribe(response => {
        expect(response.id).toBe('1');
      });

    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'POST'
    }, '');

    req.flush({
      id: '1',
      title: 'Title',
      category: 'Category',
      description: 'Description'
    });
  });
});
