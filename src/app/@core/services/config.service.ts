import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../@utils/const/app.config';
import { environment } from 'src/environments/environment';
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
    const configJSONFile = `assets/config/config.${environment.name}.json`;
    return new Promise((resolve, reject) => {
      this.http.get(configJSONFile)
        .subscribe(
          (config: any) => {
            AppConfig.apiBaseUrl = config.useMockServer ? config.mockAPIUrl : config.apiBaseUrl;
            AppConfig.useMockServer = config.useMockServer;
            AppConfig.appTitle = config.appTitle;
            AppConfig.brandName = config?.brandName;
            return resolve(config);
          },
          err => {
            return reject(err);
          }
        );
    });
  }

}
