import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Options } from './../../model/options';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private options: Options[];

  constructor() { }

  touchControls(form: FormGroup): void {
    Object.keys(form.controls).forEach((element) => {
      if (form.controls[element] instanceof FormGroup) {
        this.touchControls(<FormGroup>form.controls[element]);
      }
      form.controls[element].markAsTouched();
    });
  }

  setOptions(data: Options[]): void {
    this.options = data;
  }

  getOptions(): Options[] {
    return this.options;
  }
}
