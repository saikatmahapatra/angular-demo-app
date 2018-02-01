import { Injectable } from '@angular/core';

@Injectable()
export class ContentService {

  constructor() { }

  getCMSContent(){
    return {
      "data":{
        "title_home":"Welcome To Angular 4 Project",
        "subtitle_home":"This is a sample subtitle",
        "title_about":"",
      }
    }
  }

}
