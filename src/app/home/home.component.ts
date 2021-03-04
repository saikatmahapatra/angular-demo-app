import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  VERSION
} from '@angular/core';
import { AppService, GlobalDataService } from '../services';
import { KoreAiComponent } from '../kore-ai/kore-ai.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AppService, GlobalDataService]
})

export class HomeComponent implements OnInit, AfterViewInit {
  title = 'Angular';
  cms: any = [];
  error: any = [];
  pageData: any = [];
  @ViewChild(KoreAiComponent) private chat: KoreAiComponent;
  constructor(
    private globalDataService: GlobalDataService,
    private appService: AppService
    ) { }

  ngOnInit() {
    this.chat.closeChatWindow();
    this.getContents();
    console.log(this.appService.getDeviceType());
  }

  ngAfterViewInit() {
    console.log('home ngAfterViewInit');
    this.appService.componentLoaded.emit(true);
    this.appService.scrollToTop();
  }

  openChatWindow(event) {
    event.preventDefault();
    this.chat.openChatWindow();
  }

  getContents() {
    this.globalDataService.getCMSContent().subscribe(
      data => {
        this.cms = data;
        this.pageData = this.cms[0].page.home;
      },
      error => this.error = error
    );
  }
}
