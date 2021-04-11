import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import EXIF from 'exif-js'; 


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() newImageEvent = new EventEmitter();
  constructor() { }

  onFileSelected(value) {
    this.newImageEvent.emit(value);
  }
  ngOnInit(): void {
  }
}
