import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalMgmtComponent } from './hospital-mgmt.component';

describe('HospitalMgmtComponent', () => {
  let component: HospitalMgmtComponent;
  let fixture: ComponentFixture<HospitalMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
