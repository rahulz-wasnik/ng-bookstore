import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDailogueComponent } from './alert-dailogue.component';

describe('AlertDailogueComponent', () => {
  let component: AlertDailogueComponent;
  let fixture: ComponentFixture<AlertDailogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDailogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDailogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
