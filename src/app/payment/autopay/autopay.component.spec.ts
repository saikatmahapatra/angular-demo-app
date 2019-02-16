import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutopayComponent } from './autopay.component';

describe('AutopayComponent', () => {
  let component: AutopayComponent;
  let fixture: ComponentFixture<AutopayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutopayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutopayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
