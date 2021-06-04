import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import EXIF from 'exif-js';
import { Router } from '@angular/router';
import mapboxgl from 'mapbox-gl';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'multipart/form-data',
//     Authorization: 'my-auth-token'
//   })
// };
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient,
    private sanitizer:
      DomSanitizer, private router: Router
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  images = [];
  gpses = new BehaviorSubject([]);
  GPS = new BehaviorSubject(null);
  imageIndex = new BehaviorSubject(null);
  map;
  imageWithoutGeo = {};
  index = 0;
  poi = [];

  createMap(options) {
    this.map = new mapboxgl.Map(options);
    return this.map;
  }

  onUpload(file) {
    let env = this;
    EXIF.getData(file, function () {
      console.log(file)
      if (!EXIF.getTag(this, "GPSLatitude")) {
        env.imageWithoutGeo = file;
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          env.router.navigate(['/map/findLoc', { url: reader.result }]);
        }
        return;
      }
      let GPS = env.getGPSDec(
        EXIF.getTag(this, "GPSLatitude"),
        EXIF.getTag(this, "GPSLongitude"),
        EXIF.getTag(this, "GPSLatitudeRef"),
        EXIF.getTag(this, "GPSLongitudeRef"),
      );
      env.GPS.next(GPS);
      env.addImage(file, env.GPS.value);
    });
  }

  getGPSDec(gpsLat, gpsLng, latRef, lngRef) {
    let latDec = gpsLat[0] + gpsLat[1] / 60 + gpsLat[2] / 3600;
    let lngDec = gpsLng[0] + gpsLng[1] / 60 + gpsLng[2] / 3600;

    if (latRef == 'S') {
      latDec *= -1;
    }
    if (lngRef == 'W') {
      lngDec *= -1;
    }
    return { lngDec, latDec }
  }

  addImage(file, gps) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.router.navigate(['/map/description', { src: reader.result, index: this.index }]);
      var el = document.createElement('div');
      el.innerHTML = `<div style="display: inline-block; position: relative; width: 70px; height: 70px; overflow: hidden; border-radius: 50%;"><img style="width: auto; height: 100%;" src="${reader.result}" alt=""></div>`;

      el.style.width = '60px';
      el.style.height = '60px';
      el.style.backgroundSize = '100%';

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat([gps.lngDec, gps.latDec])
        .addTo(this.map);
    }


    const formData = new FormData();
    formData.append('file', file);
    formData.append('gps', JSON.stringify(gps));
    formData.append('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    return this.http.post(environment.apiUrl + '/image/addImage', formData).subscribe(
      (res: any) => {
        let image = res.images[res.images.length - 1];
        this.images.push({ image: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image.data}`), index: this.index++ });
        let coords: any = this.gpses.value;
        coords.push([image.gps.lngDec, image.gps.latDec])
        this.gpses.next(coords);
      },
      (err) => {
        console.log(err)
      }
    );
  }

  getImages() {
    let obj = {
      userId: JSON.parse(localStorage.getItem('currentUser'))._id
    };
    return this.http.post(environment.apiUrl + '/image/getImages', obj).subscribe(
      (res: any) => {
        let coords = [];
        if (res.images.length == this.images.length)
          return;
        this.index = 0;
        this.images = [];
        for (let i = res.images.length - 1; i > -1; i--) {
          this.images.push({ image: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.images[i].data}`), index: this.index++ });
          coords.push([res.images[i].gps.lngDec, res.images[i].gps.latDec]);
        }
        this.gpses.next(coords);
      },
      err => console.log(err)
    );
  }

  logout() {
    localStorage.clear();
  }

  close() {
    this.router.navigate(['/map/nav']);
    this.clearMap()
  }

  clearMap() {
    if (this.map.getSource('source0')) {
      this.map.removeLayer('id0');
      this.map.removeSource('source0')
    }
    for (let i = this.poi.length - 1; i > -1; i--) {
      this.poi[i].remove();
      this.poi.pop()
    }
  }
  searchByRadius(index, place, radius) {
    this.clearMap();
    let lon = this.gpses.value[index][0],
      lat = this.gpses.value[index][1],
      limit = 50,
      api_key = `f761abe49d864230a845c5a011242698`;
    this.http.get(`https://api.geoapify.com/v2/place-details?lat=${lat}&lon=${lon}&features=radius_${radius}&apiKey=${api_key}`).subscribe(
      (res: any) => {
        this.map.addSource(`source0`, {
          type: 'geojson',
          data: res.features[0]
        });
        this.map.addLayer({
          'id': `id0`,
          'type': 'fill',
          'source': `source0`, // reference the data source
          'layout': {},
          'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
          }
        });

      },
      err => console.log(err)
    );
    this.http.get(`https://api.geoapify.com/v2/places?categories=${place}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=${limit}&apiKey=${api_key}`).subscribe(
      (res: any) => {
        for (let i = 0; i < res.features.length; i++) {
          const coordinate = res.features[i].geometry.coordinates;
          let popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
          }).setHTML(`<b>${res.features[i].properties.address_line1}</b><br>${res.features[i].properties.address_line2}`);
          let marker = new mapboxgl.Marker({
            color: "red",
            // draggable: true,
            pitchAlignment: "auto",

          }).setLngLat(coordinate)
            .setPopup(popup)
            .addTo(this.map);
          this.poi.push(marker);
        }
      },
      err => {
        console.log(err)
      }
    );
  }
  searchByIsoline(index, place, range, means) {
    this.clearMap()
    let lon = this.gpses.value[index][0],
      lat = this.gpses.value[index][1],
      limit = 50,
      api_key = `f761abe49d864230a845c5a011242698`;
    this.http.get(`https://api.geoapify.com/v1/isoline?lat=${lat}&lon=${lon}&type=time&mode=${means}&range=${range}&apiKey=${api_key}`).subscribe(
      (res: any) => {
        this.map.addSource(`source0`, {
          type: 'geojson',
          data: res.features[0]
        });
        this.map.addLayer({
          'id': `id0`,
          'type': 'fill',
          'source': `source0`, // reference the data source
          'layout': {},
          'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
          }
        });
        this.http.get(`https://api.geoapify.com/v2/places?categories=${place}&filter=geometry:${res.features[0].properties.id}&bias=proximity:${lon},${lat}&limit=${limit}&apiKey=${api_key}`).subscribe(
          (res: any) => {
            for (let i = 0; i < res.features.length; i++) {
              const coordinate = res.features[i].geometry.coordinates;
              let popup = new mapboxgl.Popup({
                offset: 25,
                closeButton: false,
              }).setHTML(`<b>${res.features[i].properties.address_line1}</b><br>${res.features[i].properties.address_line2}`);
              let marker = new mapboxgl.Marker({
                color: "red",
                // draggable: true,
                pitchAlignment: "auto",
    
              }).setLngLat(coordinate)
                .setPopup(popup)
                .addTo(this.map);
              this.poi.push(marker);
            }
          },
          err => {
            console.log(err)
          }
        );
      },
      err => console.log(err)
    );

  }
  zoomOut(){
    this.map.flyTo({
      center: [1.4386666666666668, 38.90983333333333],
      zoom: 1
    });
  }
}
