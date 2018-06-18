import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { KoreAiService } from './kore-ai.service';
import { Observable } from 'rxjs/Rx';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-kore-ai',
  templateUrl: './kore-ai.component.html',
  styleUrls: ['./kore-ai.component.css','./animations.css'],
  encapsulation: ViewEncapsulation.None
})
export class KoreAiComponent implements OnInit {
  public hookResponse: any = [];
  chatForm: FormGroup; // Declare formGroup
  htmlTxt: string = '';
  isSubmitted = false;
  displayChatWindow = true;
  isMinimized = false;
  @ViewChild('scrollToBottom') private myScrollContainer: ElementRef;
  errorMessage = {
    "messageTxt": {
      "required": "Message text can't be empty"
    }
  };

  @Output() closeChat = new EventEmitter<boolean>();

  postData = {
    "from": {
      "id": "sender@domain.com",
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
    'accountId': '6148af2a-4c81-4fb7-be66-8b00cc632ca5',
    'authorizationToken': this._koreAiService.getAuthToken(),
    'bizToken': this._koreAiService.getBizToken(),
    'uuid': 'Kore_060720181722',
    'businessCode': 'CRS',
    'clientId': 'd541a926-f74d-4fac-8516-4c84b76ccf57',
    'siteId': 'PLCN_HOMEDEPOT'
  };

  constructor(private _koreAiService: KoreAiService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    //this.getWebHook();
    this.createChatForm();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  /*callBotWebHook() {
    //console.log("Send Button Clicked");
    this.getWebHook();
  }*/

  createChatForm() {
    // Using formbuilder
    this.chatForm = this._formBuilder.group({
      messageTxt: ['', [Validators.required]]
    });
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  onChatFormSubmit(event) {
    if (this.chatForm.valid) {
      //console.log("Submitted");
      this.isSubmitted = true;
      this.postData.message.text = this.chatForm.value.messageTxt;
      this.htmlTxt += '<div class="row chat-msg-container my-msg-container"><div class="col-12 msg-txt"><div class="messages my-msg-txt"><p>' + this.postData.message.text + '</p><time datetime="">You</time></div></div></div>';
      this.chatForm.reset();
      this.getWebHook();
    }
  }

  getWebHook() {
    this._koreAiService.getWebHookData(this.postData).subscribe(
      data => {
        this.hookResponse = data;
        this.htmlTxt += '<div class="row chat-msg-container bot-msg-container"><div class="col-12 msg-txt"><div class="messages bot-msg-txt"><p>' + this.hookResponse.text + '</p><time datetime="">Kore.ai</time></div></div></div>';
        return true;
      },
      error => {
        console.error("Error in fetching data from KORE AI BOT URL");
        return Observable.throw(error);
      }
    );
  }

  closeChatWindow() {
    //console.log('closeChatWindow');
    this.displayChatWindow = false;
  }

  openChatWindow() {
    //console.log('openChatWindow');
    this.isMinimized = false;
    this.displayChatWindow = true;
  }

  minimizeChatWindow() {
    //console.log('minimizeChatWindow');
    (this.isMinimized == true) ? this.isMinimized = false : this.isMinimized = true;
  }

}
