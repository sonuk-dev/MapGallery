import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from "./map/map.component";
import { NavComponent } from "./nav/nav.component";
import { ImagesComponent } from './images/images.component';
import { DescriptionComponent } from './description/description.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    MapComponent,
    NavComponent,
    ImagesComponent,
    DescriptionComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    MapComponent,
  ]
})
export class MapModule { }
