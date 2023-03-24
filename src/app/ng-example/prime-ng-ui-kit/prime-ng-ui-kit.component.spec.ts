import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNgUiKitComponent } from './prime-ng-ui-kit.component';

describe('PrimeNgUiKitComponent', () => {
  let component: PrimeNgUiKitComponent;
  let fixture: ComponentFixture<PrimeNgUiKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeNgUiKitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeNgUiKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
