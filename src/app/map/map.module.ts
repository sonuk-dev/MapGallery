import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from "./map/map.component";
import { NavComponent } from "./nav/nav.component";
import { ImagesComponent } from './images/images.component';
import { DescriptionComponent } from './description/description.component';
import { MatIconModule } from '@angular/material/icon';
import { FindLocComponent } from './find-loc/find-loc.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    MapComponent,
    NavComponent,
    ImagesComponent,
    DescriptionComponent,
    FindLocComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    MapComponent,
  ]
})
export class MapModule { }
