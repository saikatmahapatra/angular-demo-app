import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrbacComponent } from './srbac.component';

describe('SrbacComponent', () => {
  let component: SrbacComponent;
  let fixture: ComponentFixture<SrbacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrbacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrbacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
