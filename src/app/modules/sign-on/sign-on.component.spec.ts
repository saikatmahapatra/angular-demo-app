import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOnComponent } from './sign-on.component';

describe('SignOnComponent', () => {
  let component: SignOnComponent;
  let fixture: ComponentFixture<SignOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
