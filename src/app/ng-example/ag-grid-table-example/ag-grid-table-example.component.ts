import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ag-grid-table-example',
  templateUrl: './ag-grid-table-example.component.html',
  styleUrls: ['./ag-grid-table-example.component.scss']
})
export class AgGridTableExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
