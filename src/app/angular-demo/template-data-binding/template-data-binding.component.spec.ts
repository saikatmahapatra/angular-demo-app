import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDataBindingComponent } from './template-data-binding.component';

describe('TemplateDataBindingComponent', () => {
  let component: TemplateDataBindingComponent;
  let fixture: ComponentFixture<TemplateDataBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDataBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDataBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
