import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCellRendererActionButtonsComponent } from './ag-grid-cell-renderer-action-buttons.component';

describe('AgGridCellRendererActionButtonsComponent', () => {
  let component: AgGridCellRendererActionButtonsComponent;
  let fixture: ComponentFixture<AgGridCellRendererActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridCellRendererActionButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridCellRendererActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
