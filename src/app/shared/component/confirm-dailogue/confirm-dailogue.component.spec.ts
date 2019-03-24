import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ConfirmDailogueComponent } from './confirm-dailogue.component';

class MockMatDialogRef<T> {
  close() {

  }
}

describe('ConfirmDailogueComponent', () => {
  let component: ConfirmDailogueComponent;
  let fixture: ComponentFixture<ConfirmDailogueComponent>;
  let matDialogRef: MatDialogRef<ConfirmDailogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDailogueComponent],
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
    fixture = TestBed.createComponent(ConfirmDailogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    matDialogRef = TestBed.get(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text prompting users for confirmation', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h1').innerText).toContain('Kindly confirm.');
  });

  it('should call the close method on the mat dailog when the onClose event is executed', () => {
    spyOn(matDialogRef, 'close').and.callThrough();
    component.onClose();
    expect(matDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should call the close method on the mat dailog when the onOk event is executed', () => {
    spyOn(matDialogRef, 'close').and.callThrough();
    component.onOk();
    expect(matDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call the onOk event when the Ok button is clicked', async(() => {
    spyOn(component, 'onOk');

    const button = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    console.log(button);
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onOk).toHaveBeenCalled();
    });
  }));

  it('should call the onClose event when the Ok button is clicked', async(() => {
    spyOn(component, 'onClose');

    const button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onClose).toHaveBeenCalled();
    });
  }));

});
