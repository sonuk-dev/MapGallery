import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  loginUser = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6),
    ])),
  });
  createUser = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6),
    ])),
  });

  @ViewChild("container") container : ElementRef;

  ngOnInit(): void {
  }

  openSignUp() {
    this.container.nativeElement.classList.add("right-panel-active");
  }

  openSignIn() {
    this.container.nativeElement.classList.remove("right-panel-active");
  }

  register() {

    if (this.createUser.status == "INVALID")
      return;
    this.authService.addUser({
      name: this.createUser.get('name').value,
      email: this.createUser.get('email').value,
      password: this.createUser.get('password').value
    }).subscribe(
      (res: any) => {
        // this.serverError.emailDuplicate = false;
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        this.router.navigate(['/map/nav']);
      },
      (err) => {
        // "E11000 duplicate key error collection: Cluster0.users index: email_1 dup key: { email: "email@email" }"
        // if (err.error.error.endsWith(`{ email: "${this.user.get('email').value}" }`)) {
        //   this.serverError.emailDuplicate = true;
        // }
        console.log(err)
      },
    );
  }
  
  login() {
    
    if (this.loginUser.status == "INVALID")
      return;
    this.authService.login(this.loginUser.get('email').value, this.loginUser.get('password').value)
      .subscribe(
        (res: any) => {
          // this.serverError.userNotExist = false;
          // this.serverError.wrondPassword = false;
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);
          this.router.navigate(['/map/nav']);
        },
        (err) => {
          console.log(err)
          // if (JSON.parse(err.error.error).email) {
          //   this.serverError.userNotExist = true;
          //   this.serverError.wrondPassword = false;
          // } else if (JSON.parse(err.error.error).password) {
          //   this.serverError.wrondPassword = true;
          //   this.serverError.userNotExist = false;
          // }

        }
      );
  }
}
