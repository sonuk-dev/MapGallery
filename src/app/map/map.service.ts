import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import EXIF from 'exif-js';

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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  images = [];
  gpses = new BehaviorSubject([]);
  GPS = new BehaviorSubject(null);
  imageIndex = new BehaviorSubject(null);

  onUpload(file) {
    console.log('on upload')
    let env = this;
    EXIF.getData(file, function () {
      console.log(file)
      let GPS = env.getGPSDec(
        EXIF.getTag(this, "GPSLatitude"),
        EXIF.getTag(this, "GPSLongitude"),
        EXIF.getTag(this, "GPSLatitudeRef"),
        EXIF.getTag(this, "GPSLongitudeRef"),
      );
      env.GPS.next(GPS);
      console.log(env.GPS.value)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('gps', JSON.stringify(env.GPS.value));
      env.addImage(formData);
    });
  }

  getGPSDec(gpsLat, gpsLng, latRef, lngRef) {
    let latDec = gpsLat[0] + gpsLat[1] / 60 + gpsLat[2] / 3600;
    let lngDec = gpsLng[0] + gpsLng[1] / 60 + gpsLng[2] / 3600;

    console.log(latRef, lngRef)
    if (latRef == 'S') {
      latDec *= -1;
    }
    if (lngRef == 'W') {
      lngDec *= -1;
    }
    return { lngDec, latDec }
  }

  addImage(formData: any) {
    formData.append('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    return this.http.post(environment.apiUrl + '/image/addImage', formData).subscribe(
      (res: any) => {
        console.log(res)
        this.getImages();
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
        console.log(res)
        let coords = [];
        //   for (let i = res.images.length - 1; i > -1; i--) {
        //   let image = this._arrayBufferToBase64(res.images[i].data.data);
        //   this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`));
        //   coords.push({
        //     'type': 'Feature',
        //     'properties': {
        //       'iconSize': [100, 100]
        //     },
        //     'geometry': {
        //       'type': 'Point',
        //       'coordinates': [res.images[i].gps.lngDec, res.images[i].gps.latDec]
        //     }
        //   });
        // }
        if (res.images.length == this.images.length)
          return;
        // for (let i = res.images.length - 1; i > -1; i--) {
        //   let image = this._arrayBufferToBase64(res.images[i].data.data);
        //   this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`));
        //   coords.push([res.images[i].gps.lngDec, res.images[i].gps.latDec]);
        // }
        let index = 0;
        this.images = [];
        for (let i = res.images.length - 1; i > -1; i--) {
          let image = this._arrayBufferToBase64(res.images[i].data.data);
          console.log(index)
          this.images.push({image: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`), index: index++});
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

  _arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
