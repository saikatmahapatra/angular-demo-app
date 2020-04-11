import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVerifyComponent } from './payment-verify.component';

describe('PaymentVerifyComponent', () => {
  let component: PaymentVerifyComponent;
  let fixture: ComponentFixture<PaymentVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
