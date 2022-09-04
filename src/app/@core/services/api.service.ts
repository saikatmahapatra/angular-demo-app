import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public get(url: string, options?: any) {
    return this.http.get(url, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.http.put(url, data, options);
  }

  public patch(url: string, data: any, options?: any) {
    return this.http.patch(url, data, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete(url, options);
  }

}
