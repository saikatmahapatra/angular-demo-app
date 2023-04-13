import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  imgPath = 'assets/img/7.svg';

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('theme') === 'dark') {
      this.imgPath = 'assets/img/7-dark.svg';
    }
  }

}
