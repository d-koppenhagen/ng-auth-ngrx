import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

import { User } from '../models/user';
import { AuthData } from '../models/auth';

@Injectable()
export class AuthService {
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) {}

  getUserData(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getAuthData(): AuthData {
    return JSON.parse(localStorage.getItem('auth'));
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<User>(url, { username: email, password: Md5.hashStr(password) });
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post<User>(url, { username: email, password: Md5.hashStr(password) });
  }
}
