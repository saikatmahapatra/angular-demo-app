import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public get(url: string, options?: any) {
    return this.http.get(AppConfig.apiBaseUrl + url, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(AppConfig.apiBaseUrl + url, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.http.put(AppConfig.apiBaseUrl + url, data, options);
  }

  public patch(url: string, data: any, options?: any) {
    return this.http.patch(AppConfig.apiBaseUrl + url, data, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete(AppConfig.apiBaseUrl + url, options);
  }

}
