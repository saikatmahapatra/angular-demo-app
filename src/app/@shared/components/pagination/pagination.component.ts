import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  // send to parent component
  @Output() pageNumber = new EventEmitter<number>();

  // receive from parent component
  @Input() pId: string = 'mandatory';
  @Input() total!: number;
  @Input() perPage!: number;
  currentPage = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(number: any) {
    this.currentPage = number;
    this.pageNumber.emit(this.currentPage);
  }

  onPageBoundsCorrection(number: any) {
    this.currentPage = number;
    this.pageNumber.emit(this.currentPage);
  }

}
