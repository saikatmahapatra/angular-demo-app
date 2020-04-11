import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/index'; // Import the user class for form example
import { AppService, GlobalDataService, ValidationService } from 'app/services/index';
@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  providers: [AppService, GlobalDataService, ValidationService]
})


export class TemplateDrivenFormComponent implements OnInit {
  model: User[]; // model is a type of User
  cms: any = [];
  selectedSkills = [];
  genders = [{ 'name': 'Male', 'value': 'M' }, { 'name': 'Female', 'value': 'F' }];
  private cities = [{ 'name': 'Kolkata', 'value': 'CCU' }, { 'name': 'Delhi', 'value': 'DEL' }, { 'name': 'Chennai', 'value': 'CHN' }];
  skillsets = [{ 'name': 'HTML', 'value': 'html' }, { 'name': 'JavaScript', 'value': 'js' }, { 'name': 'CSS', 'value': 'css' }];
  constructor(
    private _globalDataService: GlobalDataService,
    private _appService: AppService,
    private _validator: ValidationService) { }
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
