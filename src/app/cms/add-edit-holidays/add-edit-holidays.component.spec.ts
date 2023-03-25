import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHolidaysComponent } from './add-edit-holidays.component';

describe('AddEditHolidaysComponent', () => {
  let component: AddEditHolidaysComponent;
  let fixture: ComponentFixture<AddEditHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditHolidaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
