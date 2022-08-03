import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPayrollInfoComponent } from './add-edit-payroll-info.component';

describe('AddEditPayrollInfoComponent', () => {
  let component: AddEditPayrollInfoComponent;
  let fixture: ComponentFixture<AddEditPayrollInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPayrollInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPayrollInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
