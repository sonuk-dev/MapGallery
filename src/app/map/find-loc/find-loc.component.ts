import { Component, OnInit } from '@angular/core';
import { MapService } from "../map.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

@Component({
  selector: 'app-find-loc',
  templateUrl: './find-loc.component.html',
  styleUrls: ['./find-loc.component.css']
})
export class FindLocComponent implements OnInit {
  url;
  map;
  geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: {
      draggable: true
    }
  });
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.url = this.route.snapshot.params['url'];
    this.getmap();
    document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
    
    // setInterval(()=>{console.log(this.geocoder.mapMarker)}, 100)
    // document.getElementById('geocoder').children[0].addEventListener('result', function (e) {
    //   console.log('event', e)
    // })


  }
  getmap() {
    this.map = this.mapService.map;
  }

  close() {
    this.router.navigate(['/map/nav']);

    this.mapService.zoomOut();
  }

  setGeolocation() {
    if (!this.geocoder.mapMarker) 
      return;
    let lngLat = this.geocoder.mapMarker._lngLat;
    this.geocoder.mapMarker.remove();
    let gps = { lngDec: lngLat.lng, latDec: lngLat.lat }
    this.mapService.addImage(this.mapService.imageWithoutGeo, gps);
    // this.close()
  }
}
