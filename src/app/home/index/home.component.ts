import { Component, OnInit, AfterViewInit, ViewChild, VERSION } from '@angular/core';
import { ContentService } from '../../shared/common-services/index';
import { KoreAiComponent } from '../../kore-ai/kore-ai.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ContentService]
})

export class HomeComponent implements OnInit {
  title = 'Angular '+VERSION.full;
  cms: any = [];
  error: any = [];
  pageData: any = [];
  @ViewChild(KoreAiComponent) private _chat: KoreAiComponent;
  constructor(private _contentService: ContentService) { }

  ngOnInit() {
    this._chat.closeChatWindow();
    this.getContents();
  }

  openChatWindow(event) {
    event.preventDefault();
    this._chat.openChatWindow();
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
