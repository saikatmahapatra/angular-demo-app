import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleILeadComponent } from './people-i-lead.component';

describe('PeopleILeadComponent', () => {
  let component: PeopleILeadComponent;
  let fixture: ComponentFixture<PeopleILeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleILeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleILeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
