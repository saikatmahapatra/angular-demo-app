import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimesheetGridComponent } from './view-timesheet-grid.component';

describe('ViewTimesheetGridComponent', () => {
  let component: ViewTimesheetGridComponent;
  let fixture: ComponentFixture<ViewTimesheetGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTimesheetGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimesheetGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
