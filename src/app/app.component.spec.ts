import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomePageComponent } from './feature/home/home-page/home-page.component';
import { BookDetailsPageComponent } from './feature/book-details/book-details-page/book-details-page.component';
import { RouteConstant } from './shared/constant/route.constant';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: RouteConstant.home, component: HomePageComponent },
          { path: RouteConstant.book, component: BookDetailsPageComponent },
          { path: '', redirectTo: RouteConstant.book, pathMatch: 'full' },
          { path: '**', redirectTo: RouteConstant.book, pathMatch: 'full' },
        ])
      ],
      declarations: [
        AppComponent,
        HomePageComponent,
        BookDetailsPageComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
