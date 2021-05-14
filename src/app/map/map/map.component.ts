import { Component, OnInit } from '@angular/core';
import { MapService } from "../map.service";
import { FormBuilder } from "@angular/forms";
import { environment } from '../../../environments/environment';
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

  constructor(
    private mapService: MapService, 
    public formBuilder: FormBuilder
    ) { }

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

  getGPSDec(gpsLat, gpsLng) {
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
    return { lngDec, latDec }
  }

  onUpload(file) {
    let env = this;
    EXIF.getData(file, function () {
      console.log(file)
      let GPS = env.getGPSDec(
        EXIF.getTag(this, "GPSLatitude"),
        EXIF.getTag(this, "GPSLongitude")
      );
      env.addMarker(GPS.latDec, GPS.lngDec);
      env.map.flyTo({
        center: [GPS.lngDec, GPS.latDec]
      });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('gps', JSON.stringify(GPS));
      env.addImage(formData)
    });
  }

  addImage(image) {
    this.mapService.addImage(image)
  }

  addMarker(lat, lng) {
    let marker = new mapboxgl.Marker({
      // color: "#FFFFFF",
      draggable: true,
      pitchAlignment: "auto",
    }).setLngLat([lng, lat])
      .addTo(this.map);
  }

}
