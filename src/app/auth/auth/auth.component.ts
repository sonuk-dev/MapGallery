import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }
  @ViewChild("container") container : ElementRef;
  ngOnInit(): void {
  }
  openSignUp() {
    console.log(this.container.nativeElement.classList)
    this.container.nativeElement.classList.add("right-panel-active");
  }
  openSignIn() {
    console.log(this.container.nativeElement.classList)
    this.container.nativeElement.classList.remove("right-panel-active");
  }

}
