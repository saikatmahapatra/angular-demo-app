import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceCalculationComponent } from './leave-balance-calculation.component';

describe('LeaveBalanceCalculationComponent', () => {
  let component: LeaveBalanceCalculationComponent;
  let fixture: ComponentFixture<LeaveBalanceCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveBalanceCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveBalanceCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
