import { Component, OnInit } from '@angular/core';
import EXIF from 'exif-js'; 

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }
  onFileSelected(event){
    console.log(event.target.files[0])
    // private getExif() {
      // let allMetaData: any;
      EXIF.getData(event.target.files[0], function () {
        // `this` is provided image, check with `console.log(this)`
        console.log(this)
      
        console.log(EXIF.getTag(this, "Make")) 
      // var model = EXIF.getTag(this, "Model");
      });

      
    // }
  }
  ngOnInit(): void {
  }

}
