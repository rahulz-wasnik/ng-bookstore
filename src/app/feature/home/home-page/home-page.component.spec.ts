import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";
import { By } from '@angular/platform-browser';
import { CommonModule, Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { HomePageComponent } from './home-page.component';
import { RouteConstant } from './../../../shared/constant/route.constant';
import { BookListingsComponent } from './../../book-details/book-listings/book-listings.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, BookListingsComponent],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: RouteConstant.book + '/' + RouteConstant.listings, component: BookListingsComponent }
        ])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a welcome message', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#homeContent').innerText).toContain('Welcome to a book app...Start by viewing our collection')
  });

  it('should display a button which takes the user to book listing page', () => {
    expect(fixture.debugElement.nativeElement.querySelector('a').href).toContain(RouteConstant.book + '/' + RouteConstant.listings)
  });

  it('should navigate to book listing page when the View all the books button is clicked', async(() => {
    fixture.debugElement.query(By.css('a')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual(RouteConstant.book + '/' + RouteConstant.listings);
    });
  }));

});
