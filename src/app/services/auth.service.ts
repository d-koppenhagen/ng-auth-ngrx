import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

import { User } from '../models/user';

@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  getKey(): string {
    return localStorage.getItem('key');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<User>(url, { username: email, password: Md5.hashStr(password) });
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/signup`;
    return this.http.post<User>(url, { username: email, password: Md5.hashStr(password) });
  }
}
