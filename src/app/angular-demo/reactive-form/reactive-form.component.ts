import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormBuilder, FormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
    selector: 'app-reactive-form',
    templateUrl: './reactive-form.component.html',
    providers: [FormValidationService],
    standalone: false
})
export class ReactiveFormComponent implements OnInit {

  DataGender: Array<any> = [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' }
  ];

  DataCity: Array<any> = [
    { name: 'Select', value: '' },
    { name: 'Kolkata', value: 'kolkata' },
    { name: 'Bangalore', value: 'bangalore' },
    { name: 'Chennai', value: 'chennai' },
    { name: 'Mumbai', value: 'mumbai' },
    { name: 'Hyderabad', value: 'hyderabad' },
    { name: 'Delhi', value: 'delhi' }
  ];

  DataSkills: Array<any> = [
    { name: 'JavaScript', value: 'js' },
    { name: 'HTML5', value: 'html5' },
    { name: 'CSS3', value: 'css3' },
    { name: 'Node.js', value: 'nodejs' },
    { name: 'Angular', value: 'angular' },
    { name: 'MongoDB', value: 'mongodb' }
  ];

  myForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required, this.validator.validEmail]],
    phone: ['', [Validators.required, this.validator.phoneNumber]],
    password: ['', [Validators.required, this.validator.strongPassword, this.validator.matchValidator('confirmPassword', true)]],
    confirmPassword: ['', [Validators.required, this.validator.matchValidator('password')]],
    city: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    checkArraySkill: this.fb.array([], [Validators.required]),
    termsAccepted: ['', [Validators.requiredTrue]],
    note: ['']
  });

  constructor(private fb: UntypedFormBuilder, private validator: FormValidationService) {
    this.conditionalValidation();
  }

  ngOnInit() {
    // this.name.setValue('Saikat');
    // this.name.valueChanges.subscribe((val) => {
    //   console.log('Changed Value =', val)
    // })
  }

  onCheckboxChange(e: any) {
    const checkArray: UntypedFormArray = this.myForm.get('checkArraySkill') as UntypedFormArray;
    if (e.target.checked) {
      checkArray.push(new UntypedFormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit() {
    console.log('onSubmit===', this.myForm);
    if (this.myForm.valid) {
      console.log('form submitted', this.myForm.value);
    } else {
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  conditionalValidation(){
    const city = this.myForm.controls['city'];
    const note = this.myForm.controls['note'];
    city?.valueChanges.subscribe((data) => {
      if(data != '') {
        note.setValidators([Validators.required]);
      } else{
        note.setErrors(null);
      }
    });
    note.updateValueAndValidity();
  }

}
