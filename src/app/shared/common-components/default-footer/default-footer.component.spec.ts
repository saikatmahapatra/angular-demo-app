import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFooterComponent } from './default-footer.component';

describe('DefaultFooterComponent', () => {
  let component: DefaultFooterComponent;
  let fixture: ComponentFixture<DefaultFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
