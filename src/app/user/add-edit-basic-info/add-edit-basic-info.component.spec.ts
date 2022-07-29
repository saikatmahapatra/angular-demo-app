import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBasicInfoComponent } from './add-edit-basic-info.component';

describe('AddEditBasicInfoComponent', () => {
  let component: AddEditBasicInfoComponent;
  let fixture: ComponentFixture<AddEditBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
