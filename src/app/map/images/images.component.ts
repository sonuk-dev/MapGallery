import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MapService } from "../map.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {

  constructor(public mapService: MapService, private router: Router) { }
  ngOnInit(): void {
    this.mapService.getImages();
  }

  image(event, index) {
    console.log(index)
    this.mapService.imageIndex.next(index);
    // this.showMarker.emit(index);
    this.router.navigate(['/map/description', { src: event.target.currentSrc }]);
  }
}
