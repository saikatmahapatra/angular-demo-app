import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetLayoutComponent } from './timesheet-layout.component';

describe('TimesheetLayoutComponent', () => {
  let component: TimesheetLayoutComponent;
  let fixture: ComponentFixture<TimesheetLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
