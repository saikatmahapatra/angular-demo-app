import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../../shared/modules/dynamic-form/field-config.interface';
import { DynamicFormComponent } from '../../../shared/modules/dynamic-form/dynamic-form.component';
import { ContentService } from '../../../shared/services/content.service';
import { ValidationService } from '../../../shared/services/validation.service';
import { LoggerService } from '../../../shared/services/logger.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css'],
  providers: [ContentService, ValidationService]
})
export class ApplyJobComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  private cms: any = [];
  private genderList: any[];
  private allSkills: any[];

  constructor(private _contentService: ContentService, private _validator: ValidationService, private _logger:LoggerService) { }

  ngOnInit() {
    this.getContents();
  }

  getContents() {
    this._contentService.getCMSContent().subscribe(data => {
      this.cms = data;
      this.genderList = this.cms[0].gender;
      this.allSkills = this.cms[0].skills;
    });
  }


  config: FieldConfig[] = [
    {
      type: 'text',
      class: 'form-control',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'select',
      label: 'Job Role',
      class: 'form-control',
      name: 'jobrole',
      options: ['UI Developer', 'UX Designer', 'Software Engineer', 'UI Architect'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      type: 'button',
      label: 'Submit',
      name: 'submit',
      class: 'btn btn-primary'
    }
  ];

  ngAfterViewInit() {
    this.initForm();
  }

  initForm() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    //this.form.setValue('name', 'Todd Motto');
  }

  submitForm(value: { [name: string]: any }) {
    this._logger.log(value);
  }

}
