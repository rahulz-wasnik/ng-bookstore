import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";
import { By } from '@angular/platform-browser';
import { CommonModule, Location } from '@angular/common';

import { HomePageComponent } from './home-page.component';
import { BookDetailsPageComponent } from './../../book-details/book-details-page/book-details-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, BookDetailsPageComponent],
      imports: [

        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'book/listings', component: BookDetailsPageComponent }
        ])
      ]
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

  it('should go to book listing page when the View all the books button is clicked', async(() => {
    fixture.debugElement.query(By.css('a')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/book/listings');
    });

  }));

});
