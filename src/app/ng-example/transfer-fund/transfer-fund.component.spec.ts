import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFundComponent } from './transfer-fund.component';

describe('TransferFundComponent', () => {
  let component: TransferFundComponent;
  let fixture: ComponentFixture<TransferFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransferFundComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Transfer Fund');
  }));

});
