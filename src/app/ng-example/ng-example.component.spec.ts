import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgExampleComponent } from './ng-example.component';

describe('NgExampleComponent', () => {
  let component: NgExampleComponent;
  let fixture: ComponentFixture<NgExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
