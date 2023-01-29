import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApproversComponent } from './edit-approvers.component';

describe('EditApproversComponent', () => {
  let component: EditApproversComponent;
  let fixture: ComponentFixture<EditApproversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApproversComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApproversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
