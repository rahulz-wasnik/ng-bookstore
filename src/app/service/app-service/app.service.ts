import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  /**
   * @description Touches controls of the form object passed by calling the markAsTouched function on every control in the form
   * @param form 
   */
  touchControls(form: FormGroup): void {
    Object.keys(form.controls).forEach((element) => {
      if (form.controls[element] instanceof FormGroup) {
        this.touchControls(<FormGroup>form.controls[element]);
      }
      form.controls[element].markAsTouched();
    });
  }
}
