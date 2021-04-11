import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import EXIF from 'exif-js';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  zoom = 12
  constructor() { }
  parseGPS(file) {

    EXIF.getData(file, function () {
      console.log(this)
      let gpsLat = EXIF.getTag(this, "GPSLatitude");
      let gpsLng = EXIF.getTag(this, "GPSLongitude");
      const latDec = gpsLat[0] + gpsLat[1] / 60 + gpsLat[2] / 3600;
      const lngDec = gpsLng[0] + gpsLng[1] / 60 + gpsLng[2] / 3600;
      let latRef = EXIF.getTag(this, "GPSLatitudeRef");
      let lngRef = EXIF.getTag(this, "GPSLongitudeRef");
      if (latRef == 'S') {
        latRef *= -1;
      }
      if (lngRef == 'W') {
        lngRef *= -1;
      }
      console.log(latDec)
      console.log(lngDec)
    });

  }
  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
