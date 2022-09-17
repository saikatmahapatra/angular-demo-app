import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-add-edit-emergency-contact',
  templateUrl: './add-edit-emergency-contact.component.html',
  styleUrls: ['./add-edit-emergency-contact.component.scss']
})
export class AddEditEmergencyContactComponent implements OnInit {
  submitted = false;
  loading = false;
  id: any = '';
  isAdd = true;
  title = 'Add';
  relationDataList!: Array<any>;
  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    contactPersonName: ['', [Validators.required]],
    relationWithContact: ['', [Validators.required]],
    phoneNo: ['', [Validators.required, this.validator.phoneNumber]],
    communicationAddress: ['']
  });

  constructor(private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFormData();
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.router.url.indexOf('edit-emergency-contact') != -1) {
      this.isAdd = false;
      this.title = 'Edit';
      this.myForm.controls['action'].setValue('edit');
    }
    if (this.id) {
      this.getContact();
    }
  }

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.emergencyContactFormData).subscribe((val: any) => {
      this.relationDataList = val?.data?.relation
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(AppConfig.apiUrl.addEmergencyContact, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.myForm.reset();
            this.router.navigate(['user/profile']);
          }
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(AppConfig.apiUrl.updateEmergencyContact, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.myForm.reset();
            this.router.navigate(['user/profile']);
          }
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  getContact() {
    let queryParams = new HttpParams();
    if (this.id) {
      queryParams = queryParams.append('id', this.id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getEmergencyContact, options).subscribe((val: any) => {
      this.patchFormValue(val?.data?.contact[0]);
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'edit',
      contactPersonName: data?.contact_person_name,
      relationWithContact: data?.relationship_with_contact,
      phoneNo: data?.contact_person_phone1,
      communicationAddress: data?.contact_person_address
    });
  }

}
