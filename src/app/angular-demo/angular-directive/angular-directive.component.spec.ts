import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDirectiveComponent } from './angular-directive.component';

describe('AngularDirectiveComponent', () => {
  let component: AngularDirectiveComponent;
  let fixture: ComponentFixture<AngularDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
