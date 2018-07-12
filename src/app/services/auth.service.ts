import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

import { User } from '../models/user';
import { AuthData } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    @Inject('API_URL') private _apiUrl: string,
    private _http: HttpClient
  ) {}

  getUserData(): User {
    const localStorageUserData = localStorage.getItem('currentUser');
    return localStorageUserData && localStorageUserData !== 'undefined' ? JSON.parse(localStorageUserData) : null;
  }

  getAuthData(): AuthData {
    const localStorageAuthData = localStorage.getItem('auth');
    return localStorageAuthData && localStorageAuthData !== 'undefined' ? JSON.parse(localStorageAuthData) : null;
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this._apiUrl}/login`;
    return this._http.post<User>(url, { email: email, password: Md5.hashStr(password) });
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this._apiUrl}/signup`;
    return this._http.post<User>(url, { email: email, password: Md5.hashStr(password) });
  }
}
