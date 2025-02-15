import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-upload-doc',
    templateUrl: './upload-doc.component.html',
    styleUrls: ['./upload-doc.component.scss'],
    standalone: false
})
export class UploadDocComponent implements OnInit {
  submitted = false;
  loading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
