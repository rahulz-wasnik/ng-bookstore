import { TestBed, inject } from '@angular/core/testing';

import { BookManagementService } from './book-management.service';

describe('BookManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookManagementService]
    });
  });

  it('should be created', inject([BookManagementService], (service: BookManagementService) => {
    expect(service).toBeTruthy();
  }));
});
