import { Component, OnInit, AfterViewInit, ViewChild, VERSION } from '@angular/core';
import { GlobalDataService } from 'app/services';
import { KoreAiComponent } from 'app/kore-ai/kore-ai.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [GlobalDataService]
})

export class HomeComponent implements OnInit {
  title = 'Angular '+VERSION.full;
  cms: any = [];
  error: any = [];
  pageData: any = [];
  @ViewChild(KoreAiComponent) private _chat: KoreAiComponent;
  constructor(private _globalDataService: GlobalDataService) { }

  ngOnInit() {
    this._chat.closeChatWindow();
    this.getContents();
  }

  openChatWindow(event) {
    event.preventDefault();
    this._chat.openChatWindow();
  }

  getContents() {
    this._globalDataService.getCMSContent().subscribe(
      data => {
        this.cms = data;
        this.pageData = this.cms[0].page.home;
      },
      error => this.error = error
    );
  }
}
