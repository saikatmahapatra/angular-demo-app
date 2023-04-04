import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHolidaysComponent } from './manage-holidays.component';

describe('ManageHolidaysComponent', () => {
  let component: ManageHolidaysComponent;
  let fixture: ComponentFixture<ManageHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHolidaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
