import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { DescriptionComponent } from './description/description.component';
import { ImagesComponent } from './images/images.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  // { path: 'map', component: MapComponent },
  {
    path: '',
    component: MapComponent,
    children: [
      {
        path: 'description', component: DescriptionComponent, data: {
          src: String
        }
      },
      { path: 'nav', component: NavComponent },
      { path: '', component: NavComponent },
      // { path: 'map', component: MapComponent },
    ],
  },
  { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
