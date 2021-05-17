import { Component, OnInit } from '@angular/core';
import { MapService } from "../map.service";
import { FormBuilder } from "@angular/forms";
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Router } from "@angular/router";
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
  zoom = 2;
  markers = [];
  images = [];
  constructor(
    private mapService: MapService,
    public formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.mapService.GPS.subscribe((GPS) => {
      if(!GPS)
        return;
      this.addMarker(GPS.latDec, GPS.lngDec);
      this.map.flyTo({
        center: [GPS.lngDec, GPS.latDec],
        zoom: 17,
      });
    });

    this.mapService.imageIndex.subscribe((index) => {
      console.log('sub', index)
      if (index == null)
        return;
      let gps = this.mapService.gpses.value[index];
      console.log('sub', gps)
      this.map.flyTo({
        center: [gps[0], gps[1]],
        zoom: 17,
      });
    });
    this.mapService.gpses.subscribe((data) => {
      // console.log(this.mapService.gpses.value)
      let coordinats = this.mapService.gpses.value;
      this.getImages();
      console.log(this.images, coordinats)
      this.addMarkers(coordinats);

      //       var bounds = new mapboxgl.LngLatBounds();

      // this.markers.forEach(function(feature) {
      //     bounds.extend(feature.geometry.coordinates);
      // });

      // this.map.fitBounds(bounds);
    })

    // this.map.fitBounds(this.map.getBounds(), {padding: 100});
  }

  getImages() {
    this.images = this.mapService.images;
  }

  addMarkers(coordinates) {
    let set = new Set(coordinates.map(coord => JSON.stringify(coord)));
    let coords = Array.from(set).map((coord: string) => JSON.parse(coord));
    coords.forEach(coord => {
      this.addMarker(coord[1], coord[0]);
    });

    // for (let i = 0; i < geodata.length; i++) {
    //   console.log(geodata[i])

    //        // Create a DOM element for each marker.
    //        var el = document.createElement('div');
    //        el.className = 'marker';
    //       //  el.style.backgroundImage = this.images[i];
    //        el.style.backgroundImage = 'url(https://placekitten.com/g/' +
    //        geodata[i].properties.iconSize.join('/') +
    //        '/)';
    //        el.style.width = geodata[i].properties.iconSize[0] + 'px';
    //        el.style.height = geodata[i].properties.iconSize[1] + 'px';
    //        el.style.backgroundSize = '100%';

    //       //  el.addEventListener('click', function () {
    //       //  window.alert(geodata[i].properties.message);
    //       //  });

    //        // Add markers to the map.
    //        new mapboxgl.Marker(el)
    //        .setLngLat(geodata[i].geometry.coordinates)
    //        .addTo(this.map); 
    // }      
  }

  addImage(image) {
    this.mapService.addImage(image)
  }

  addMarker(lat, lng) {
    let marker = new mapboxgl.Marker({
      // color: "#FFFFFF",
      // draggable: true,
      pitchAlignment: "auto",
      
    }).setLngLat([lng, lat])
      .addTo(this.map);
    this.markers.push(marker)
  }
}
