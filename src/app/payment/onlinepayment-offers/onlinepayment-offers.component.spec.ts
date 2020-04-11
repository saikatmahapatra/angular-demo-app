import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinepaymentOffersComponent } from './onlinepayment-offers.component';

describe('OnlinepaymentOffersComponent', () => {
  let component: OnlinepaymentOffersComponent;
  let fixture: ComponentFixture<OnlinepaymentOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinepaymentOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinepaymentOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
