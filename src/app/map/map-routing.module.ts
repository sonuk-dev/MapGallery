import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { DescriptionComponent } from './description/description.component';
import { NavComponent } from './nav/nav.component';
import { FindLocComponent } from './find-loc/find-loc.component'

const routes: Routes = [
  {
    path: '',
    component: MapComponent,
    children: [
      {
        path: 'description', component: DescriptionComponent, data: {
          src: String, 
          index: Number
        }
      },
      { path: 'nav', component: NavComponent },
      { path: '', component: NavComponent },
      {
        path: 'findLoc', component: FindLocComponent, data: {
          url: String,
        }
      },
    ],
  },
  { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule), }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
