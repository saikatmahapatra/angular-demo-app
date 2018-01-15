import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputBindingComponent } from './form-input-binding.component';

describe('FormInputBindingComponent', () => {
  let component: FormInputBindingComponent;
  let fixture: ComponentFixture<FormInputBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
