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
  cms: any[];
  pageData: any[];
  mydata: any= [];
  constructor(private _contentService: ContentService) { }

  ngOnInit() {
    this.cms = this._contentService.getCMSContent();
    this.pageData = this.cms[0].page.home;

    this._contentService.getMockContent().subscribe(data=>{
      console.log("Mock",data);
      this.mydata = data
    });

    console.log("Saikat",this.mydata);
  }
}
