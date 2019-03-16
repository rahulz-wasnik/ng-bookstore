
// 3rd Party Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Application Modules
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../../shared/shared.module';

// Components
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  imports: [
  CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [HomePageComponent]
})
export class HomeModule { }
