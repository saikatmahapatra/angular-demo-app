import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgExampleLayoutComponent } from './ng-example-layout.component';

describe('NgExampleLayoutComponent', () => {
  let component: NgExampleLayoutComponent;
  let fixture: ComponentFixture<NgExampleLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgExampleLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgExampleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
