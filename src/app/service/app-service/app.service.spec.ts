import { TestBed, inject } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';

import { AppService } from './app.service';

describe('AppService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService]
    });
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('should touch all the controls in the form', inject([AppService], (service: AppService) => {
    const form = new FormGroup({
      title: new FormControl(''),
      category: new FormControl(''),
      description: new FormControl('')
    });
    service.touchControls(form);
    expect(form.get('title').touched).toBeTruthy();
    expect(form.get('category').touched).toBeTruthy();
    expect(form.get('description').touched).toBeTruthy();
  }));
});
