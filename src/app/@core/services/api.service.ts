import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public get(url: string, options?: any) {
    return this.http.get(CustomAppConfig.apiBaseUrl + url, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(CustomAppConfig.apiBaseUrl + url, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.http.put(CustomAppConfig.apiBaseUrl + url, data, options);
  }

  public patch(url: string, data: any, options?: any) {
    return this.http.patch(CustomAppConfig.apiBaseUrl + url, data, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete(CustomAppConfig.apiBaseUrl + url, options);
  }

}
