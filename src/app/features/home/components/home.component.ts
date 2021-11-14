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
import { CommonService } from '../../../shared/services/common.service';
import { ApiService } from '../../../shared/services/api.service';
import { KoreAiComponent } from '../../kore-ai/kore-ai.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [CommonService, ApiService]
})

export class HomeComponent implements OnInit, AfterViewInit {
  cms: any = [];
  error: any = [];
  pageData: any = [];
  @ViewChild(KoreAiComponent) private chat: any;
  constructor(
    private apiSvc: ApiService,
    private commonSvc: CommonService
    ) { }

  ngOnInit() {
    this.chat.closeChatWindow();
    this.getContents();
    console.log(this.commonSvc.getDeviceType());
    this.test();
  }

  test() {
    this.apiSvc.createUsers({name: 'XXX', email: 'aaaa@aaa.com', password: 'aaaaa'});
  }

  ngAfterViewInit() {
    console.log('home ngAfterViewInit');
    this.commonSvc.componentLoaded.emit(true);
    this.commonSvc.scrollToTop();
  }

  openChatWindow(event: { preventDefault: () => void; }) {
    event.preventDefault();
    this.chat.openChatWindow();
  }

  getContents() {
    this.apiSvc.getCMSContent().subscribe(
      data => {
        this.cms = data;
        this.pageData = this.cms[0];
      },
      error => this.error = error
    );
  }
}
