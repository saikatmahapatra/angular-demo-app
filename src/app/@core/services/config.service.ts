import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../@utils/const/app-config';
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
            AppConfig.appTitle = config.appTitle || 'My Angular App';
            AppConfig.apiBaseUrl = config.useMockServer ? config.mockAPIUrl : config.apiBaseUrl;
            return resolve(config);
          },
          err => {
            return reject(err);
          }
        );
    });
  }

}
