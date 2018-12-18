import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapUiComponent } from './bootstrap-ui.component';

describe('BootstrapUiComponent', () => {
  let component: BootstrapUiComponent;
  let fixture: ComponentFixture<BootstrapUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
