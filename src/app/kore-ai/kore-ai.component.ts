import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { KoreAiService } from './kore-ai.service';
import { Observable } from 'rxjs/Rx';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-kore-ai',
  templateUrl: './kore-ai.component.html',
  styleUrls: ['./kore-ai.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class KoreAiComponent implements OnInit {
  public hookResponse: any = [];
  chatForm: FormGroup; // Declare formGroup
  htmlTxt: string = '';

  postData = {
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

  constructor(private _koreAiService: KoreAiService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    //this.getWebHook();
    this.createChatForm();
  }
  

  callBotWebHook() {
    console.log("Button Clicked");
    this.getWebHook();
  }

  createChatForm() {
    // Using formbuilder
    this.chatForm = this._formBuilder.group({
      messageTxt: ['', [Validators.required]]
    });
  }

  onChatFormSubmit() {
    if (this.chatForm.valid) {
      console.log("Submitted");
      this.postData.message.text = this.chatForm.value.messageTxt;
      this.htmlTxt += '<div class="row chat-msg-container sent-msg-container"><div class="col-10 msg-txt"><div class="messages sent-msg-txt"><p>' + this.postData.message.text + '</p><time datetime="2009-11-13T20:00">You</time></div></div></div>';
      this.chatForm.reset();
      this.getWebHook();
    }
  }

  getWebHook() {
    this._koreAiService.getWebHookData(this.postData).subscribe(
      data => {
        this.hookResponse = data;
        this.htmlTxt+='<div class="row chat-msg-container receive-msg-container"><div class="col-10 msg-txt"><div class="messages receive-msg-txt"><p>'+this.hookResponse.text+'</p><time datetime="2009-11-13T20:00">KoreBot</time></div></div></div>';
        return true;
      },
      error => {
        console.error("Error in fetching data from KORE AI BOT URL");
        return Observable.throw(error);
      }
    );
  }



}
