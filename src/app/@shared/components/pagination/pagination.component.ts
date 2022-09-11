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
  @Output() perPageItem = new EventEmitter<number>();
  @Output() data = new EventEmitter<Object>();

  // receive from parent component
  @Input() pId: string = 'mandatory';
  @Input() total!: number;
  @Input() perPage!: number;
  perPageArr: Array<number> = [10, 15, 20, 25, 30, 50, 100];
  currentPage = 1;

  constructor() { }

  ngOnInit(): void {
    console.log('per page', this.perPage);
  }

  onPageChange(number: any) {
    this.currentPage = number;
    this.pageNumber.emit(this.currentPage);
  }

  onPageBoundsCorrection(number: any) {
    this.currentPage = number;
    this.pageNumber.emit(this.currentPage);
  }

  getPerPage(e: any) {
    this.perPageItem.emit(e.currentTarget.value);
  }

}
