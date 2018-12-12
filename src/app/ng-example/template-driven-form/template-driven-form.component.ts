import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { User } from '../../shared/models/index'; // Import the user class for form example
import { ContentService, LoggerService, ValidationService } from '../../shared/services/index';
@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css'],
  providers: [ContentService, ValidationService]
})


export class TemplateDrivenFormComponent implements OnInit {
  cms: any = [];
  //private phoneTypes = [];
  constructor(private _contentService: ContentService,
     private _logger: LoggerService,
    private _validator : ValidationService) { }

  ngOnInit() {
    this.getContents();
  }

  getContents() {
    this._contentService.getCMSContent().subscribe(data => {
      this.cms = data;
      //this.phoneTypes = this.cms[0].phoneType;
    });
  }

  isSubmitted = false;
  model = new User(1, 'Saikat', 'Mahapatra', 'mahapatra.saikat@gmail.com', '');
  //model = new FormData('','','','','');
  onSubmit(event) {
    this._logger.log(event);
    this.isSubmitted = true;
  }
  get formData() {
    return JSON.stringify(this.model);
  }

}
