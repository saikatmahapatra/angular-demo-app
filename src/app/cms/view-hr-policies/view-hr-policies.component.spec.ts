import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHrPoliciesComponent } from './view-hr-policies.component';

describe('ViewHrPoliciesComponent', () => {
  let component: ViewHrPoliciesComponent;
  let fixture: ComponentFixture<ViewHrPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHrPoliciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHrPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
