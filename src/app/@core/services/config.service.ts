import { Injectable, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomAppConfig } from '../../@utils/const/custom-app.config';
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
            CustomAppConfig.apiBaseUrl = config.useMockServer ? config.mockAPIUrl : config.apiBaseUrl;
            // CustomAppConfig.useMockServer = config.useMockServer;
            // CustomAppConfig.title = config.title;
            // CustomAppConfig.productName = config?.productName;
            // CustomAppConfig.copyrightInfo = config?.copyrightInfo;
            // CustomAppConfig.version = config?.version;
            CustomAppConfig.maintenanceMode = config.maintenanceMode || false;
            CustomAppConfig.mfaEnabled = config.mfaEnabled;
            return resolve(config);
          },
          err => {
            return reject(err);
          }
        );
    });
  }

}
