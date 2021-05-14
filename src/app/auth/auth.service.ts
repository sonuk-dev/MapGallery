import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  addUser(user) {
    return this.http.post(environment.apiUrl + '/auth/registration', user)
  }
  login(email, password) {
    return this.http.post(environment.apiUrl + '/auth/login', {
      email: email,
      password: password
    });
  }
}
