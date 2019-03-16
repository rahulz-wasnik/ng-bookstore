// 3rd Party Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Application Modules
import { SharedModule } from './../shared/shared.module';

// Components
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  imports: [
  CommonModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
