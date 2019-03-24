import { BookDetailsModule } from './book-details.module';

describe('BookDetailsModule', () => {
  let bookDetailsModule: BookDetailsModule;

  beforeEach(() => {
    bookDetailsModule = new BookDetailsModule();
  });

  it('should create an instance', () => {
    expect(bookDetailsModule).toBeTruthy();
  });
});
