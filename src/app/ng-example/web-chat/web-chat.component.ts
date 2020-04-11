import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-chat',
  templateUrl: './web-chat.component.html'
})
export class WebChatComponent implements OnInit {
  msgContainer = document.getElementsByClassName('messageContainer');
  constructor() {
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    //console.log(this.msgContainer.item);
    //this.msgContainer.scrollTop(this.msgContainer[0].scrollHeight);
  }

}
