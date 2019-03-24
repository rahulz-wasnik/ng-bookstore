import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BookDetailsPageComponent } from './book-details-page.component';
import { MockStore } from './../../../store/mock.store';
import * as fromBookStore from '../store';
import { AppService } from './../../../service/app-service/app.service';
import { RouteConstant } from './../../../shared/constant/route.constant';
import { HomePageComponent } from './../../home/home-page/home-page.component';
import { BookListingsComponent } from './../book-listings/book-listings.component';
import { AddBookComponent } from './../add-book/add-book.component';

describe('BookDetailsPageComponent', () => {
  let component: BookDetailsPageComponent;
  let fixture: ComponentFixture<BookDetailsPageComponent>;
  let service: AppService;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: RouteConstant.home, component: HomePageComponent },
          { path: RouteConstant.book, component: BookDetailsPageComponent, resolve: {optionsData: of(2)} },
          { path: RouteConstant.book + '/' + RouteConstant.listings, component: BookListingsComponent },
          { path: RouteConstant.book + '/' + RouteConstant.add, component: AddBookComponent },
          { path: '', redirectTo: RouteConstant.book, pathMatch: 'full' },
          { path: '**', redirectTo: RouteConstant.book, pathMatch: 'full' },
        ])
      ],
      declarations: [ BookDetailsPageComponent, HomePageComponent, BookListingsComponent, AddBookComponent ],
      providers: [
        AppService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsPageComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AppService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create set options', () => {
    spyOn(service, 'setOptions').and.callThrough();
    component.ngOnInit();
    expect(service.setOptions).toHaveBeenCalled();
  });

});
