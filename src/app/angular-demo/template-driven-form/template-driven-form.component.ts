import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-template-driven-form',
    templateUrl: './template-driven-form.component.html',
    providers: [],
    standalone: false
})


export class TemplateDrivenFormComponent implements OnInit {
  loading = false;
  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.loading = true;
    console.log(f);
  }
}
