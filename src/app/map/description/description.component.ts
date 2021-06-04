import { Component, OnInit } from '@angular/core';
import { MapService } from "../map.service";
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  src;
  radius = '100';
  range = '300';
  means = new FormControl('')

  constructor(
    public mapService: MapService,
    public route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.means.setValue('drive')
    this.src = this.route.snapshot.params['src'];
    console.log(this.mapService.gpses.value[this.route.snapshot.params['index']])
  }
  close() {
    this.mapService.close();
    this.mapService.zoomOut();
  }
  searchByRadius(place) {
    this.mapService.searchByRadius(this.route.snapshot.params['index'], place, this.radius)
  }
  searchByIsoline(place) {
    this.mapService.searchByIsoline(this.route.snapshot.params['index'], place, this.range, this.means.value)
  }
}
