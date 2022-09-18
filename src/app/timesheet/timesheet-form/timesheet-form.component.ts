import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.scss']
})
export class TimesheetFormComponent implements OnInit {
  submitted = false;
  loading = false;
  selected!: Date | null;

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    dates: [''],
    project: ['', Validators.required],
    task: ['', Validators.required],
    hours: [9, Validators.required],
    description: ['', Validators.required]
  });


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
