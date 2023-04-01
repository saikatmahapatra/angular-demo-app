import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  title = 'Add';
  loading = false;
  contentCategoryList = [
    {id: 'news', name: 'News Updates'},
    {id: 'notice', name: 'Notice'},
    {id: 'policy', name: 'HR Policy'}
  ];

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    contentCategory: ['', [Validators.required]],
    contentHeadline: ['', [Validators.required]],
    contentDescription: ['', [Validators.required]]
  })

  constructor(
    private fb: UntypedFormBuilder,
    private validationSvc: FormValidationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
