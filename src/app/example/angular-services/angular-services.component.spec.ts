import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularServicesComponent } from './angular-services.component';

describe('AngularServicesComponent', () => {
  let component: AngularServicesComponent;
  let fixture: ComponentFixture<AngularServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
