import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapService } from "../map.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() newImageEvent = new EventEmitter();

  constructor(public mapService: MapService) { }

  onFileSelected(value) {
    this.newImageEvent.emit(value);
  }

  ngOnInit(): void {
  }
}
