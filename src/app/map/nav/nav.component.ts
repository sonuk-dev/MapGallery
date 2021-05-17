import { Component, OnInit } from '@angular/core';
import { MapService } from "../map.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(public mapService: MapService) { }

  onFileSelected(file) {
    this.mapService.onUpload(file)
  }

  logout() {
    this.mapService.logout()
  }

  ngOnInit(): void {
  }
}
