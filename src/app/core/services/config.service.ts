import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app-config';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }
  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadConfig()
        .then(res => {
          resolve(true);
        })
        .catch(err => {
        });
    });
  }

  loadConfig() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/config/config-dev.json')
        .subscribe(
          (config: any) => {
            AppConfig.APP_TITLE = config.appTitle || 'My Angular App';
            AppConfig.API_BASE_URL = config.apiBaseUrl;
            return resolve(config);
          },
          err => {
            return reject(err);
          }
        );
    });
  }

}
