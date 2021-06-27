import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss'],
  providers: [HospitalService]
})
export class DepartmentViewComponent implements OnInit, OnDestroy {
  departmentList: any = [];
  departmentDataList$;
  hospitalList: any = [];
  deptForm: FormGroup;
  formSubmitted = false;
  isEdit = false;
  queryParamHospitalId: number;
  queryParamHospitalName: string = '';
  pageTitle = 'Departments';
  showBackLink = false;

  departmentObj = {
    departmentname: '',
    head: '',
    contactnumber: '',
    hospitalId: '',
    hospitalname: ''
  };

  constructor(
    private hospitalSvc: HospitalService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.queryParamHospitalId = params['hospitalId'];
      this.queryParamHospitalName = params['hospitalName'];
  });
   }

  ngOnInit() {
    this.createDeptForm();
    if (this.queryParamHospitalName) {
      this.getAllDeptsOfHospital();
      this.pageTitle = 'Department of ' + this.queryParamHospitalName;
      this.showBackLink = true;

    } else {
      this.getAllDepts();
    }
  }

  createDeptForm() {
    this.getAllHospitals();
    this.deptForm = new FormGroup({
      hospitalId: new FormControl(null, [Validators.required]),
      departmentname: new FormControl(null, [Validators.required]),
      head: new FormControl(null, [Validators.required]),
      contactnumber: new FormControl(null, [Validators.required, Validators.pattern('^\\d{10}$')]),
    });
  }

  getAllHospitals() {
    this.hospitalSvc.getAllHospitals().subscribe((res) => {
      this.hospitalList = res;
    });
  }

  get hospitalId() {
    return this.deptForm.get('hospitalId');
  }

  get departmentname() {
    return this.deptForm.get('departmentname');
  }

  get head() {
    return this.deptForm.get('head');
  }

  get contactnumber() {
    return this.deptForm.get('contactnumber');
  }

  getAllDepts() {
    this.departmentDataList$ = this.hospitalSvc.getAllDept().subscribe((res) => {
      this.departmentList = res;
    });
  }

  getAllDeptsOfHospital() {
    this.departmentDataList$ = this.hospitalSvc.getAllDeptOfHosp(this.queryParamHospitalId, this.queryParamHospitalName).subscribe((res) => {
      this.departmentList = res;
    });
  }

 addDept(formObj) {
    this.formSubmitted = true;
    if (formObj.valid) {
      this.hospitalSvc.createDept(formObj.value).subscribe(response => {
        alert('Department Added Successfully!');
        formObj.reset();
        this.formSubmitted = false;
        if (this.queryParamHospitalName) {
          this.getAllDeptsOfHospital();
        } else {
          this.getAllDepts();
        }
      });
    }
  }

  editDept(dept) {
    this.isEdit = true;
    this.departmentObj = dept;
  }

  updateDept(formObj) {
    this.formSubmitted = true;
    if (formObj.valid) {
      this.isEdit = !this.isEdit;
      this.hospitalSvc.updateDept(this.departmentObj).subscribe( () => {
        alert('Department Updated successfully!');
        formObj.reset();
        this.formSubmitted = false;
        if (this.queryParamHospitalName) {
          this.getAllDeptsOfHospital();
        } else {
          this.getAllDepts();
        }
      });
    }
  }

  deleteDept(dept) {
    this.hospitalSvc.deleteDept(dept).subscribe( () => {
      alert('Department Deleted successfully!');
      if (this.queryParamHospitalName) {
        this.getAllDeptsOfHospital();
      } else {
        this.getAllDepts();
      }
    });
  }

  ngOnDestroy() {
    this.departmentDataList$.unsubscribe();
  }


}
