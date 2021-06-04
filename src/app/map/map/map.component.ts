import { Component, OnInit } from '@angular/core';
import { MapService } from "../map.service";
import { FormBuilder } from "@angular/forms";
import * as mapboxgl from 'mapbox-gl';
import { Router } from "@angular/router";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 1.4386666666666668;
  lng = 38.90983333333333;
  zoom = 1;
  markers = [];
  images = [];
  constructor(
    private mapService: MapService,
    public formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit() {
    this.map = this.createMap({
      accessToken: mapboxgl.accessToken,
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.mapService.GPS.subscribe((GPS) => {
      if (!GPS)
        return;
      // this.addMarker(GPS.latDec, GPS.lngDec);
      this.map.flyTo({
        center: [GPS.lngDec, GPS.latDec],
        zoom: 17,
      });
    });

    this.mapService.imageIndex.subscribe((index) => {
      if (index == null)
        return;
      let gps = this.mapService.gpses.value[index];
      this.map.flyTo({
        center: [gps[0], gps[1]],
        zoom: 17,
      });
    });
    this.mapService.gpses.subscribe((data) => {
      let coordinats = this.mapService.gpses.value;
      this.getImages();
      this.addMarkers(coordinats);

      //       var bounds = new mapboxgl.LngLatBounds();

      // this.markers.forEach(function(feature) {
      //     bounds.extend(feature.geometry.coordinates);
      // });

      // this.map.fitBounds(bounds);
    })

    // this.map.fitBounds(this.map.getBounds(), {padding: 100});
    // this.mapService.getPlaces()

  }

  createMap(options) {
    return this.mapService.createMap(options);
  }

  getImages() {
    this.images = this.mapService.images;
  }

  addMarkers(coordinates) {

    for (let i = 0; i < coordinates.length; i++) {
      var el = document.createElement('div');
      el.innerHTML = `<div style="display: inline-block; position: relative; width: 70px; height: 70px; overflow: hidden; border-radius: 50%;"><img style="width: auto; height: 100%;" src="${this.images[i].image.changingThisBreaksApplicationSecurity}" alt=""></div>`;

      el.style.width = '60px';
      el.style.height = '60px';
      el.style.backgroundSize = '100%';

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat(coordinates[i])
        .addTo(this.map);
    };
  }

  addMarker(lat, lng) {
    let marker = new mapboxgl.Marker({
      // color: "#FFFFFF",
      pitchAlignment: "auto",
    }).setLngLat([lng, lat])
      .addTo(this.map);
    this.markers.push(marker)
  }
}
