import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-upload-photo',
    templateUrl: './upload-photo.component.html',
    styleUrls: ['./upload-photo.component.scss'],
    standalone: false
})
export class UploadPhotoComponent implements OnInit {
  submitted = false;
  loading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
