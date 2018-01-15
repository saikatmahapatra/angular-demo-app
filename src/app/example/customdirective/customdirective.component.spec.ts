import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomdirectiveComponent } from './customdirective.component';

describe('CustomdirectiveComponent', () => {
  let component: CustomdirectiveComponent;
  let fixture: ComponentFixture<CustomdirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomdirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomdirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
