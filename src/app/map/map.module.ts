import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from "./map/map.component";
import { NavComponent } from "./nav/nav.component";
import { ImagesComponent } from './images/images.component';

@NgModule({
  declarations: [
    MapComponent,
    NavComponent,
    ImagesComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    MapComponent,
  ]
})
export class MapModule { }
