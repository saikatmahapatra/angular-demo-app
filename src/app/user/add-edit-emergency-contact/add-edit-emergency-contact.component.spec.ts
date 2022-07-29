import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmergencyContactComponent } from './add-edit-emergency-contact.component';

describe('AddEditEmergencyContactComponent', () => {
  let component: AddEditEmergencyContactComponent;
  let fixture: ComponentFixture<AddEditEmergencyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEmergencyContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEmergencyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
