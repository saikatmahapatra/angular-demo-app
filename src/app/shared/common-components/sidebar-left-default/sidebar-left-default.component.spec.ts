import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLeftDefaultComponent } from './sidebar-left-default.component';

describe('SidebarLeftDefaultComponent', () => {
  let component: SidebarLeftDefaultComponent;
  let fixture: ComponentFixture<SidebarLeftDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarLeftDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLeftDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
