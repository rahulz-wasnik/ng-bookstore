import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDailogueComponent } from './confirm-dailogue.component';

describe('ConfirmDailogueComponent', () => {
  let component: ConfirmDailogueComponent;
  let fixture: ComponentFixture<ConfirmDailogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDailogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDailogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
