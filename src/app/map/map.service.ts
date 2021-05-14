import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }
  images;
  addImage(formData: any) {
    formData.append('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    console.log(formData.get('gps'))
    return this.http.post(environment.apiUrl + '/image/addImage', formData).subscribe(
      (res: any) => {
        console.log(res.images.length - 1)
        console.log(res)
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
    return this.http.post(environment.apiUrl + '/image/getImages', obj);
  }
}
