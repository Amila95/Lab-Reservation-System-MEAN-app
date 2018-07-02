import { Injectable } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _router: Router) { }

  register(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
    return this._http.post<any>('http://127.0.0.1:3000/users/login', body, {
      observe: 'body',
      withCredentials:true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  listlabs() {

    return this._http.get('http://127.0.0.1:3000/users/getlabs', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
      .pipe(map(res => res));


  }

  resavation(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/reservation', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  resavation_checkbydate(body:any) {
    return this._http.post('http://127.0.0.1:3000/users/resavation_checkbydate' , body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).pipe(map(res => res));
  }

  logout(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/logout', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  check(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/check', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  get_details(body: any) {
    return this._http.post('http://127.0.0.1:3000/users/get_details', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).pipe(map(res => res));
  }

  labs(seat) {
    return this._http.get('http://127.0.0.1:3000/users/labs/' + seat)
      .pipe(map(res => res));
  }

  labstype(type) {
    return this._http.get('http://127.0.0.1:3000/users/typelabs/' + type)
      .pipe(map(res => res));
  }

  labscon(type) {
    return this._http.get('http://127.0.0.1:3000/users/conlabs/' + type)
      .pipe(map(res => res));
  }
}
