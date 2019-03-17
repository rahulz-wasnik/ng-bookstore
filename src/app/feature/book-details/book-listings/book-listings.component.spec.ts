import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListingsComponent } from './book-listings.component';

describe('BookListingsComponent', () => {
  let component: BookListingsComponent;
  let fixture: ComponentFixture<BookListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
