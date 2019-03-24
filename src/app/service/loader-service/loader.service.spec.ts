import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpRequest } from '@angular/common/http';

import { LoaderService } from './loader.service';
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

  it('should issue a load books', async () => {
    service.loadBooks(2, 0)
    .subscribe(response => {
      expect(response.length).toBe(2);
      expect(response[0].title).toEqual('Title 1');
      expect(response[0].category).toEqual('Category 1');
      expect(response[0].description).toEqual('Description 1');
    });

    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET'
    }, '');

    expect(req.request.url).toBe(environment.api + 'book?pageSize=2&pageIndex=1');

    req.flush(
      [
        {
          _id: '1',
          title: 'Title 1',
          category: 'Category 1',
          description: 'Description 1'
        },
        {
          _id: '2',
          title: 'Title 2',
          category: 'Category 2',
          description: 'Description 2'
        }
      ]
    );
  });

  it('should issue a request to get total number of books', async () => {
    service.getTotalNumberOfBooks().subscribe(
      (response => {
        expect(response).toBe(2);
      })
    );
    
    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET'
    }, '');

    expect(req.request.url).toBe(environment.api + 'book/count');

    req.flush(2);
  });

  it('should issue a request to get options', async () => {
    service.getOptions().subscribe(
      (response => {
        expect(response.length).toEqual(2);
        expect(response[0].label).toEqual('History');
        expect(response[0].value).toEqual('ca_1');
      })
    );

    const req = httpTestingController.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET'
    }, '');

    expect(req.request.url).toBe(environment.api + 'book/options');    

    req.flush(
      [
        {
          label: 'History',
          value: 'ca_1'
        },
        {
          label: 'Geography',
          value: 'ca_2'
        }
      ]
    );
  });

});
