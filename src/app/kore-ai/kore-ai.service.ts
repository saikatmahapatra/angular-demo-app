import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // dont use old Http
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYXBwSWQiOiJjcy02NzQ4ZGZhYy05ZWQ3LTUyYWMtOTg3Ny00YzBhNWNjZDBlZjYifQ.WLT6bwpkwwdW5wYGdZZdOmKO9kYp1JyTMQFtC7AHoO0';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': authToken
  })
};

@Injectable()
export class KoreAiService {
  
  private _botId: string = 'st-cf3806b6-5c56-5529-b576-544a8751b527'; // Bot ID
  private _clientId: string = ''; // Client ID
  private _clientSecret: string = ''; // Client Secret key
  private _webHookUrl: string = 'https://bots.kore.ai/chatbot/hooks/'+this._botId;

  constructor(private _http: HttpClient) {
    console.log("KoreAiService: constructor() called");
  }

  getWebHookData(postData) {
    let body = JSON.stringify(postData);
    return this._http.post(this._webHookUrl, body, httpOptions);
  }

  getBotId(){
    return this._botId;
  }

}
