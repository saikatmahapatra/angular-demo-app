import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';

@Component({
    selector: 'app-add-edit-task',
    templateUrl: './add-edit-task.component.html',
    styleUrls: ['./add-edit-task.component.scss'],
    standalone: false
})
export class AddEditTaskComponent implements OnInit {

  submitted = false;
  loading = false;
  id: any = '';
  isAdd = true;
  title = 'Add';
  taskDropdown!: Array<any>;
  data: any;

  DataStatus: Array<any> = [
    { id: 'Y', name: 'Active' },
    { id: 'N', name: 'Inactive' }
  ];

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    taskName: ['', [Validators.required, this.validator.notEmpty]],
    //parentTaskId: [''],
    status: ['Y', [Validators.required]]
  });

  constructor(
    private commonSvc: CommonService,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //console.log(this.router.url);
    if (this.router.url.indexOf('add-task') != -1 || this.router.url.indexOf('edit-task') != -1) {
      this.getFormData();
    }
    if (this.router.url.indexOf('edit-task') != -1) {
      this.isAdd = false;
      this.title = 'Edit';
      this.myForm.controls['action'].setValue('edit');
    }

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.getTask();
    }
    this.commonSvc.setTitle(this.title + ' Task');
    
  }

  getFormData() {
    this.apiSvc.get(CustomAppConfig.apiUrl.taskFormData).subscribe((val: any) => {
      this.taskDropdown = val?.data?.taskDropdown;
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(CustomAppConfig.apiUrl.addTask, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.setAlert('success', response.message, true);
            this.myForm.reset();
            this.router.navigate(['project/manage-tasks']);
          }
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(CustomAppConfig.apiUrl.updateTask, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.setAlert('success', response.message, true);
            this.myForm.reset();
            this.router.navigate(['project/manage-tasks']);
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

  getTask() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.id);
    const options = { params: queryParams };
    this.apiSvc.get(CustomAppConfig.apiUrl.getTask, options).subscribe((response: any) => {
      this.patchFormValue(response.data.data_rows[0]);
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'edit',
      taskName: data?.task_name,
      //parentTaskId: data?.task_parent_id,
      status: data?.task_status
    });
  }

  redirect() {
    this.router.navigate(['/project/manage-tasks']);
  }

}
