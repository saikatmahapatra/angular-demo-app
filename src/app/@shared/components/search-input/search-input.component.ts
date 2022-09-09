import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() newSearchKeyword = new EventEmitter<string>();
  @Input() searchKeyword: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  searchInput(value: string){
    this.newSearchKeyword.emit(value);
  }

}
