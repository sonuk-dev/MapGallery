import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery'
import { AuthModule } from "./auth/auth.module";
import { MapModule } from "./map/map.module";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdDp_J2ZQIo9Wz38DY41G6OUSxopK6oeo'
    }),
    AuthModule,
    MapModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Angular2ImageGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
