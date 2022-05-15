import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCmsComponent } from './manage-cms.component';

describe('ManageCmsComponent', () => {
  let component: ManageCmsComponent;
  let fixture: ComponentFixture<ManageCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
