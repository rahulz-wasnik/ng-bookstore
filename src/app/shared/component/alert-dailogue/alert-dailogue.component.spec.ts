import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { AlertDailogueComponent } from './alert-dailogue.component';

class MockMatDialogRef<T> {
  close() {

  }
}

describe('AlertDailogueComponent', () => {
  let component: AlertDailogueComponent;
  let fixture: ComponentFixture<AlertDailogueComponent>;
  let matDialogRef: MatDialogRef<AlertDailogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertDailogueComponent],
      imports: [
        MatDialogModule,
      ],
      providers: [
        MatDialog,
        { provide: MatDialogRef, useClass: MockMatDialogRef }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDailogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    matDialogRef = TestBed.get(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the close method on the mat dailog', () => {
    spyOn(matDialogRef, 'close').and.callThrough();
    component.onOk();
    expect(matDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should contain text alerting user of missing mandatory information', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h2').innerText).toContain('Missing mandatory fields.');
  });

  it('should call the onOk function when the Ok button is clicked', async(() => {
    spyOn(component, 'onOk');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onOk).toHaveBeenCalled();
    });
  }));


});
