import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRightDefaultComponent } from './sidebar-right-default.component';

describe('SidebarRightDefaultComponent', () => {
  let component: SidebarRightDefaultComponent;
  let fixture: ComponentFixture<SidebarRightDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRightDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRightDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
