import { Component, OnInit } from '@angular/core';
import { User } from '../../models/index'; // Import the user class for form example
import { CommonService } from '../../../shared/services/common.service';
import { ApiService } from '../../../shared/services/api.service';
import { ValidationService } from '../../../shared/services/validation.service';
@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  providers: [CommonService, ApiService, ValidationService]
})


export class TemplateDrivenFormComponent implements OnInit {
  model!: User[]; // model is a type of User
 // model is a type of User
  cms: any = [];
  selectedSkills = [];
  genders = [{ name: 'Male', value: 'M' }, { name: 'Female', value: 'F' }];
  private cities = [{ name: 'Kolkata', value: 'CCU' }, { name: 'Delhi', value: 'DEL' }, { name: 'Chennai', value: 'CHN' }];
  skillsets = [{ name: 'HTML', value: 'html' }, { name: 'JavaScript', value: 'js' }, { name: 'CSS', value: 'css' }];
  constructor(
    private apiSvc: ApiService,
    private commonSvc: CommonService,
    private validator: ValidationService) { }
  formSubmitted = false;

  ngOnInit() {

  }

  addUser(form: any) {
    console.log(form.value);
    this.formSubmitted = true;
    this.model = form.value;
  }

  getSelectedSkills(data: any) {
    console.log(data);
  }

}
