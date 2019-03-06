import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOnFormComponent } from './sign-on-form.component';

describe('SignOnFormComponent', () => {
  let component: SignOnFormComponent;
  let fixture: ComponentFixture<SignOnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
