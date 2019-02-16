import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDefaultComponent } from './nav-default.component';

describe('NavDefaultComponent', () => {
  let component: NavDefaultComponent;
  let fixture: ComponentFixture<NavDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
