import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MapService } from "../map.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {
  constructor(public mapService: MapService, private sanitizer: DomSanitizer) { }
  images = [];
  ngOnInit(): void {
    this.getImages();
  }
  getImages() {
    this.mapService.getImages().subscribe(
      (res: any) => {
        console.log(res)
        for (let i = res.images.length - 1; i > -1; i--) {
          let image = this._arrayBufferToBase64(res.images[i].data.data);
          this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`));
        }
      },
      err => console.log(err)
    );
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
  image(){

  }
}
