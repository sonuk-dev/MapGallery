import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map/map.component';

const routes: Routes = [
  { path: '', redirectTo: '/map/nav', pathMatch: 'full'},
  // { path: '**', redirectTo: '/map/nav', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
