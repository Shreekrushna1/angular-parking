import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  apiUrl: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  postData(url?: string, data?: any) {
    return this.http.post(`${this.apiUrl + url}`, data);
  }
  deleteData(url?: string, data?: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl + url}`, data);
  }
  putData(url?: string, data?: any) {
    return this.http.put(`${this.apiUrl + url}`, data);
  }
  getData(url?: string) {
    return this.http.get(`${this.apiUrl + url}`);
  }
}
