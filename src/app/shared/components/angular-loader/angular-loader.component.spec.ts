import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularLoaderComponent } from './angular-loader.component';

describe('AngularLoaderComponent', () => {
  let component: AngularLoaderComponent;
  let fixture: ComponentFixture<AngularLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
