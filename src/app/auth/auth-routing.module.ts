import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MapComponent } from "../map/map/map.component";

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'map',
    loadChildren: () => import('../map/map.module').then(m => m.MapModule),
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
