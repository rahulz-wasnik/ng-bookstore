import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";
import { By } from '@angular/platform-browser';
import { CommonModule, Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './header.component';
import { BookListingsComponent } from './../../../feature/book-details/book-listings/book-listings.component';
import { AddBookComponent } from './../../../feature/book-details/add-book/add-book.component';
import { HomePageComponent } from './../../../feature/home/home-page/home-page.component';
import { RouteConstant } from './../../../shared/constant/route.constant';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, BookListingsComponent, AddBookComponent, HomePageComponent],
      imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        RouterTestingModule.withRoutes([
          { path: RouteConstant.home, component: HomePageComponent },
          { path: RouteConstant.book + '/' + RouteConstant.listings, component: BookListingsComponent },
          { path: RouteConstant.book + '/' + RouteConstant.add, component: AddBookComponent }
        ])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a link which takes the user to home page', () => {
    expect(fixture.debugElement.queryAll(By.css('a'))[0].nativeElement.href).toContain(RouteConstant.home)
  });

  it('should display a link which takes the user to book listing page', () => {
    expect(fixture.debugElement.queryAll(By.css('a'))[1].nativeElement.href).
      toContain(RouteConstant.book + '/' + RouteConstant.listings)
  });

  it('should display a link which takes the user to add book page', () => {
    expect(fixture.debugElement.queryAll(By.css('a'))[2].nativeElement.href).
      toContain(RouteConstant.book + '/' + RouteConstant.add)
  });

  it('should navigate to home page when the My Book App link is clicked', async(() => {
    fixture.debugElement.queryAll(By.css('a'))[0].nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toContain(RouteConstant.home);
    });
  }));

  it('should navigate to book listing page when the Listings link is clicked', async(() => {
    fixture.debugElement.queryAll(By.css('a'))[1].nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toContain(RouteConstant.book + '/' + RouteConstant.listings);
    });
  }));

  it('should navigate to add a book page when the Add a book link is clicked', async(() => {
    fixture.debugElement.queryAll(By.css('a'))[2].nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toContain(RouteConstant.book + '/' + RouteConstant.add);
    });
  }));
});
