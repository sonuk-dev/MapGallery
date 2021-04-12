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
  parseGPS(file) {
    let env = this;
    EXIF.getData(file, function () {
      console.log(this)
      let gpsLat = EXIF.getTag(this, "GPSLatitude");
      let gpsLng = EXIF.getTag(this, "GPSLongitude");
      let latDec = gpsLat[0] + gpsLat[1] / 60 + gpsLat[2] / 3600;
      let lngDec = gpsLng[0] + gpsLng[1] / 60 + gpsLng[2] / 3600;
      let latRef = EXIF.getTag(this, "GPSLatitudeRef");
      let lngRef = EXIF.getTag(this, "GPSLongitudeRef");
      if (latRef == 'S') {
        latDec *= -1;
      }
      if (lngRef == 'W') {
        lngDec *= -1;
      }
      console.log(latDec)
      console.log(lngDec)
      env.addMarker(latDec, lngDec)
      env.map.flyTo({
        center: [lngDec, latDec]
        });
    });
  }
  addMarker(lat, lng){
      let marker = new mapboxgl.Marker({
      // color: "#FFFFFF",
      draggable: true,
      pitchAlignment: "auto",
      }).setLngLat([lng, lat])
      .addTo(this.map);
  }
}
