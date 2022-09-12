import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() inputValue = new EventEmitter<string>();
  @Input() resetInput!: boolean;
  value = '';
  constructor() { 
    if(this.resetInput) {
      this.resetInputValue();
    }
  }

  ngOnInit(): void {
  }

  getVal(value: string){
    this.inputValue.emit(value);
  }

  resetInputValue() {
    this.value = '';
  }

}
