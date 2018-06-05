import { Component, OnInit } from '@angular/core';
import { KoreAiService } from './kore-ai.service';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-kore-ai',
  templateUrl: './kore-ai.component.html',
  styleUrls: ['./kore-ai.component.css']
})
export class KoreAiComponent implements OnInit {
  public hookResponse: any = [];

  constructor(private _koreAiService: KoreAiService) { }

  ngOnInit() {
    //this.getWebHook();
  }

  callBotWebHook() {
    console.log("Button Clicked");
    this.getWebHook();
  }

  getWebHook() {
    let postData = {
      "from": {
        "id": "saikat@test.com",
        "userInfo": {}
      },
      "to": {
        "id": this._koreAiService.getBotId(),
        "groupInfo": {},
      },
      "message": {
        "text": "Get mini statement"
      },
      "session": {
        "new": true
      },
      "ACNumber": "921010"

    };
    this._koreAiService.getWebHookData(postData).subscribe(
      data => {
        this.hookResponse = data;
        return true;
      },
      error => {
        console.error("Error in fetching data from KORE AI BOT URL");
        return Observable.throw(error);
      }
    );
  }



}
