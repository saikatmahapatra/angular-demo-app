import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.scss'],
  providers: [HospitalService]
})
export class HospitalViewComponent implements OnInit, OnDestroy {
  hospitalList: any = [];
  hospitalDataList$;
  hospitalForm: FormGroup;
  formSubmitted = false;
  isEdit = false;
  hospitalObj = {
    hospitalname: '',
    contactnumber : '',
    id: ''
  };
  constructor(
    private hospitalSvc: HospitalService
  ) { }

  ngOnInit() {
    this.getAllHospitals();
    this.createHospitalForm();
  }

  createHospitalForm() {
    this.hospitalForm = new FormGroup({
      hospitalname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      contactnumber: new FormControl(null, [Validators.required, Validators.pattern('^\\d{10}$')]),
    });
  }

  get hospitalname() {
    return this.hospitalForm.get('hospitalname');
  }

  get contactnumber() {
    return this.hospitalForm.get('contactnumber');
  }

  getAllHospitals() {
    this.hospitalDataList$ = this.hospitalSvc.getAllHospitals().subscribe((res) => {
      this.hospitalList = res;
    });
  }

  returnToAddView(formObj) {
    this.isEdit = false;
    formObj.reset();
  }

  addHospital(formObj) {
    this.formSubmitted = true;
    if (formObj.valid) {
      this.hospitalSvc.createHospital(formObj.value).subscribe(response => {
        alert('Added successfully!');
        formObj.reset();
        this.formSubmitted = false;
        this.getAllHospitals();
      });
    }
  }

  editHospital(hospital) {
    this.isEdit = true;
    this.hospitalObj = hospital;
  }

  updateHospital(formObj) {
    this.formSubmitted = true;
    if (formObj.valid) {
      this.isEdit = !this.isEdit;
      this.hospitalSvc.updateHospital(this.hospitalObj).subscribe( () => {
        alert('Updated successfully!');
        formObj.reset();
        this.formSubmitted = false;
        this.getAllHospitals();
      });
    }
  }

  deleteHospital(hospital) {
    this.hospitalSvc.deleteHospital(hospital).subscribe( () => {
      alert('Deleted successfully!');
      this.getAllHospitals();
    });
  }

  ngOnDestroy() {
    this.hospitalDataList$.unsubscribe();
  }

}
