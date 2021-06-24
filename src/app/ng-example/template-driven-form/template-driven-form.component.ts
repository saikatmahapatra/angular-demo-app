import { Component, OnInit } from '@angular/core';
import { User } from '../../models/index'; // Import the user class for form example
import { CommonService, BackendService, ValidationService } from '../../services';
@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  providers: [CommonService, BackendService, ValidationService]
})


export class TemplateDrivenFormComponent implements OnInit {
  model: User[]; // model is a type of User
  cms: any = [];
  selectedSkills = [];
  genders = [{ name: 'Male', value: 'M' }, { name: 'Female', value: 'F' }];
  private cities = [{ name: 'Kolkata', value: 'CCU' }, { name: 'Delhi', value: 'DEL' }, { name: 'Chennai', value: 'CHN' }];
  skillsets = [{ name: 'HTML', value: 'html' }, { name: 'JavaScript', value: 'js' }, { name: 'CSS', value: 'css' }];
  constructor(
    private globalDataService: BackendService,
    private commonSvc: CommonService,
    private validator: ValidationService) { }
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
