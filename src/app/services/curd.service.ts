import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class CurdService {

  headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

  // base_url = 'http://192.168.11.150:6500';
  // base_url=' http://developerhub.ddns.net:6500/';
  base_url='https://votexback.geoinfobox.com/';
  // http://developerhub.ddns.net:6500/ 

  constructor(private http: HttpClient) { }


  // save vote data

  saveForm(data: any): Observable<any> {
    let input_data = {
      "user_name": data.user_name,
      "gnd_id": data.gnd_id,
      "client_name": data.client_name,
      "phone1": data.phone1,
      "pmt_vote": data.pmt_vote,
      "flt_vote": data.flt_vote,
      "superuser_id": data.superuser_id,
      "address": data.address,
      "nic": data.nic,
      "party_id":data.party_id,
      "local": 'True',
      "edited": 'False',
    }
    let url = `${this.base_url}/${'api/users/votedatapost/'}`
    return this.http.post(url, input_data);
  }

  // get user data

  getUserData(data: any): Observable<any> {
    let url = `${this.base_url}/${'api/users/userdata/'}${'userid='}${data}${'/'}`
    return this.http.get(url);
  }

  // get poliparty data

  getPoliparty(): Observable<any> {
    let url = `${this.base_url}${'api/users/poliparty/all/'}`
    return this.http.get(url);
  }

  getGndData(data: any): Observable<any> {
    console.log(data)
    let input_data = {
      gnd_id: data
    }
    let url = `${this.base_url}/${'api/users/gnddata/'}`
    return this.http.post(url, input_data);
  }

  private setHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `${'Token'} ${token}`,
      'Content-Type': 'application/json'
    });
  }

  changePassword(data: any ,token:any): Observable<any> {
    console.log(data)
    let input_data = {
      old_password: data.old_password,
      new_password: data.new_password,
      confirm_new_password: data.confirm_new_password,
    }
    const headers = this.setHeaders(token);
    let url = `${this.base_url}/${'api/users/change_password/'}`
    return this.http.post(url, input_data , { headers });
  }

  getMPData(data: any): Observable<any> {
    console.log(data)

    let url = `${this.base_url}/${'api/users/userdata/userid='}${data}${'/'}`
    return this.http.get(url);
  }

  getUserVoteData(data: any): Observable<any> {
    let url = `${this.base_url}/${'api/users/votedataapp/'}${'gid='}${data}${'/'}`
    return this.http.get(url);
  }

  getUserUser(data: any): Observable<any> {
    let url = `${this.base_url}/${'api/users/votedata/'}${'id='}${data}${'/'}`
    return this.http.get(url);
  }
  
  dataInsertUser(data: any): Observable<any> {
    let url = `${this.base_url}/${'api/users/votedataapp/'}${'gid='}${data}${'/'}`
    return this.http.get(url);
  }

  getVoteSummery(_id:any) {
    let url = `${this.base_url}/${'api/users/gndavg/'}${'gid='}${_id}${'/'}`
    return this.http.get(url);
  }

  editVoteData(data: any): Observable<any> {
    console.log(data)
    let url = `${this.base_url}/${'api/users/votedataupdate/'}${data.id}${'/'}`;

    return this.http.put(url, data);
  }

  deleteVoteData(data: any): Observable<any> {
    let url = `${this.base_url}/${'api/users/votedataupdate/'}${data}${'/'}`
    return this.http.delete(url);
  }
}
