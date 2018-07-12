import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  baseUrl: string;

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) {
    this.baseUrl = `${this.apiUrl}/api/v1`;
  }

  getExampleData(): Observable<any> {
    const url = `${this.baseUrl}/example`;
    return this.http.get<any>(url);
  }
}
