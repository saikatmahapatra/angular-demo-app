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
  model: User[] = []; // model is a type of User
  cms: any = [];
  selectedSkills = [];
  genders = [{ 'name': 'Male', 'value': 'M' }, { 'name': 'Female', 'value': 'F' }];
  private cities = [{ 'name': 'Kolkata', 'value': 'CCU' }, { 'name': 'Delhi', 'value': 'DEL' }, { 'name': 'Chennai', 'value': 'CHN' }];
  skillsets = [{ 'name': 'HTML', 'value': 'html' }, { 'name': 'JavaScript', 'value': 'js' }, { 'name': 'CSS', 'value': 'css' }];
  constructor(private _contentService: ContentService, private _logger: LoggerService, private _validator: ValidationService) { }
  formSubmitted = false;

  ngOnInit() {

  }

  addUser(form) {
    console.log(form.value);
    this.formSubmitted = true;
    this.model = form.value;
  }

  getSelectedSkills(data) {
    console.log(data);
  }

}
