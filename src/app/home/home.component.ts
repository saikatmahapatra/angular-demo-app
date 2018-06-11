import { Component, OnInit } from '@angular/core';
import { ContentService } from '../shared/services/index';
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
  chatOpened = false;

  constructor(private _contentService: ContentService) { }

  ngOnInit() {
    this.getContents();
  }

  openChat(event){
    event.preventDefault();
    this.chatOpened = true;
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
