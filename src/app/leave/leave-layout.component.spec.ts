import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveLayoutComponent } from './leave-layout.component';

describe('LeaveLayoutComponent', () => {
  let component: LeaveLayoutComponent;
  let fixture: ComponentFixture<LeaveLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
