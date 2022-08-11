import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTableExampleComponent } from './ag-grid-table-example.component';

describe('AgGridTableExampleComponent', () => {
  let component: AgGridTableExampleComponent;
  let fixture: ComponentFixture<AgGridTableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridTableExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
