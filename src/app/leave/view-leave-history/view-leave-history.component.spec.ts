import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveHistoryComponent } from './view-leave-history.component';

describe('ViewLeaveHistoryComponent', () => {
  let component: ViewLeaveHistoryComponent;
  let fixture: ComponentFixture<ViewLeaveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaveHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeaveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
