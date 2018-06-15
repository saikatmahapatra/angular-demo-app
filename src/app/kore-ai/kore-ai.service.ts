import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // dont use old Http
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

/**
 * Authorization Token : This should be pass to HTTP header
 * Should be dynamic. Get from cookie. 
 * Do not place word 'Bearer' before the token string.
 */
const authorizationToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYXBwSWQiOiJjcy02NzQ4ZGZhYy05ZWQ3LTUyYWMtOTg3Ny00YzBhNWNjZDBlZjYifQ.WLT6bwpkwwdW5wYGdZZdOmKO9kYp1JyTMQFtC7AHoO0';

/**
 * Biz Token
 * Should be dynamic. Get from cookie.
 */
const bizToken = 'ssss';



@Injectable()
export class KoreAiService {

  /**
   * Chat Bot Configuration
   */

  // Bot ID
  private _botId: string = 'st-cf3806b6-5c56-5529-b576-544a8751b527';

  // Client ID
  private _clientId: string = '';

  // Client Secret key
  private _clientSecret: string = '';

  // Kore AI webhook URL with Bot ID
  private _webHookUrl: string = 'https://bots.kore.ai/chatbot/hooks/' + this._botId;

  //HTTP Header
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthToken()
    })
  };

  constructor(private _http: HttpClient) { }

  getWebHookData(postData) {
    let body = JSON.stringify(postData);
    return this._http.post(this._webHookUrl, body, this._httpOptions);
  }

  getBotId() {
    return this._botId;
  }

  getBizToken() {
    //check if cookies bizToken is empty or not. if empty pass const bizToken
    return this.getCookie('bizToken').length > 0 ? this.getCookie('bizToken') : bizToken;
  }

  getAuthToken() {
    //check if cookies Authorization is empty or not. if empty pass const bizToken
    return this.getCookie('Authorization').length > 0 ? 'Bearer ' + this.getCookie('Authorization') : 'Bearer ' + authorizationToken;
  }

  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
}