import { Component, OnInit } from '@angular/core';
import { MapService } from "../map.service";
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
    
  src;
  
  constructor(
    public mapService: MapService, 
    public route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.src = this.route.snapshot.params['src'];
  }
  close() {
    this.router.navigate(['/map/nav']);
  }
}
