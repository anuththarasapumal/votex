import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
headers= new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
// base_url='http://192.168.11.150:6500';
// base_url=' http://developerhub.ddns.net:6500/';
base_url='https://votexback.geoinfobox.com/';
//  base_url='http://192.168.11.150:6500';
 
  constructor(private http: HttpClient) { }
  login(data: any): Observable<any> {
    let url=`${this.base_url}/${'api/users/login/'}`
    return this.http.post(url, data);
  }
}
