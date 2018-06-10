import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  isSubmitted = false;
  chatWindowOpen = true;
  @ViewChild('scrollToBottom') private myScrollContainer: ElementRef;
  errorMessage = {
    "messageTxt": {
      "required": "Message text can't be empty"
    }
  };


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
      "text": "hi"
    },
    "session": {
      "new": true
    },
    "accountNumber": "123456789",
    "messageTypeId": "greeting",
    "transactionId": "06042018"

  };

  constructor(private _koreAiService: KoreAiService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    //this.getWebHook();
    this.createChatForm();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
    this.chatWindowOpen = true;
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

  closeChatWindow(event) {
    this.chatWindowOpen = false;
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  onChatFormSubmit() {
    if (this.chatForm.valid) {
      console.log("Submitted");
      this.isSubmitted = true;
      this.postData.message.text = this.chatForm.value.messageTxt;
      this.htmlTxt += '<div class="row chat-msg-container sent-msg-container"><div class="col-11 msg-txt"><div class="messages sent-msg-txt"><p>' + this.postData.message.text + '</p><time datetime="">You</time></div></div></div>';
      this.chatForm.reset();
      this.getWebHook();
      //this.scrollToBottom();
    }
  }

  getWebHook() {
    this._koreAiService.getWebHookData(this.postData).subscribe(
      data => {
        this.hookResponse = data;
        this.htmlTxt += '<div class="row chat-msg-container receive-msg-container"><div class="col-11 msg-txt"><div class="messages receive-msg-txt"><p>' + this.hookResponse.text + '</p><time datetime="">Kore.ai</time></div></div></div>';
        //this.scrollToBottom();
        return true;
      },
      error => {
        console.error("Error in fetching data from KORE AI BOT URL");
        return Observable.throw(error);
      }
    );
  }



}
