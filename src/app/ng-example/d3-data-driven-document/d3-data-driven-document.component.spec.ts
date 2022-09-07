import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3DataDrivenDocumentComponent } from './d3-data-driven-document.component';

describe('D3DataDrivenDocumentComponent', () => {
  let component: D3DataDrivenDocumentComponent;
  let fixture: ComponentFixture<D3DataDrivenDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3DataDrivenDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3DataDrivenDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
