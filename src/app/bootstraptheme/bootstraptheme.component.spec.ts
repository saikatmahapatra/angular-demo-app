import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapthemeComponent } from './bootstraptheme.component';

describe('BootstrapthemeComponent', () => {
  let component: BootstrapthemeComponent;
  let fixture: ComponentFixture<BootstrapthemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapthemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapthemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
