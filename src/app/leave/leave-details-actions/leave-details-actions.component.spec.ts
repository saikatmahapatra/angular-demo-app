import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetailsActionsComponent } from './leave-details-actions.component';

describe('LeaveDetailsActionsComponent', () => {
  let component: LeaveDetailsActionsComponent;
  let fixture: ComponentFixture<LeaveDetailsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveDetailsActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveDetailsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
