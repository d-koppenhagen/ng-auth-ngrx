import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  baseUrl: string;

  constructor(
    @Inject('API_URL') private _apiUrl: string,
    private _http: HttpClient
  ) {
    this.baseUrl = `${this._apiUrl}/api/v1`;
  }

  getExampleData(): Observable<any> {
    const url = `${this.baseUrl}/example`;
    return this._http.get<any>(url);
  }
}
