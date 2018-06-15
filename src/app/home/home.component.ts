import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ContentService } from '../shared/services/index';
import { KoreAiComponent } from '../kore-ai/kore-ai.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ContentService]
})

export class HomeComponent implements OnInit {
  title = 'Home';
  subtitle = 'Welcome to Angular2 development';
  cms: any = [];
  error: any = [];
  pageData: any = [];
  @ViewChild(KoreAiComponent) private _chat: KoreAiComponent;
  constructor(private _contentService: ContentService) { }

  ngOnInit() {
    this._chat.displayChatWindow = false;
    this.getContents();
  }

  openChatWindow(event) {
    event.preventDefault();
    this._chat.displayChatWindow = true;
  }

  getContents() {
    this._contentService.getCMSContent().subscribe(
      data => {
        this.cms = data;
        this.pageData = this.cms[0].page.home;
      },
      error => this.error = error
    );
  }
}
