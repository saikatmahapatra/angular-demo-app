import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ContentService]
})

export class HomeComponent implements OnInit {
  title = 'Home';
  subtitle = 'Welcome to Angular2 development';
  private page = {};
  constructor(private _page: ContentService) { }

  ngOnInit() {
    this.page = this._page.getCMSContent();
  }
}
