import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveListoryComponent } from './view-leave-listory.component';

describe('ViewLeaveListoryComponent', () => {
  let component: ViewLeaveListoryComponent;
  let fixture: ComponentFixture<ViewLeaveListoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaveListoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeaveListoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
