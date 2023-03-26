import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetReportComponent } from './edit-timesheet.component';

describe('TimesheetReportComponent', () => {
  let component: TimesheetReportComponent;
  let fixture: ComponentFixture<TimesheetReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
