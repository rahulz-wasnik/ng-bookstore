// 3rd Party Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from "@angular/common/http";

// Application Modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { environment } from './../environments/environment';
import { reducers } from './store/root.reducer';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Book Management',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
