import { Component, OnInit } from '@angular/core';
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
  // private phoneTypes = [];
  cities = [{ 'id': '1', 'name': 'Delhi' }, { 'id': '2', 'name': 'Kolkata' }, { 'id': '3', 'name': 'Mumbai' }];
  constructor(
    private _contentService: ContentService,
    private _logger: LoggerService,
    private _validator: ValidationService) { }
    formSubmit = false;

  ngOnInit() {

  }

  saveUser(form){
    console.log(form.value);
    this.formSubmit = true;
  }
