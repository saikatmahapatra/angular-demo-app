import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBankInfoComponent } from './add-edit-bank-info.component';

describe('AddEditBankInfoComponent', () => {
  let component: AddEditBankInfoComponent;
  let fixture: ComponentFixture<AddEditBankInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBankInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBankInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
