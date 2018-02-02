import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ValidationService } from '../../../services/validation.service';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  providers: [ContentService, ValidationService]
})
export class ReactiveFormComponent implements OnInit {

  constructor(private _contentService: ContentService, private _validator: ValidationService) { }

  ngOnInit() {
    console.log(this._validator.regEx.aba_routing);
  }

}
