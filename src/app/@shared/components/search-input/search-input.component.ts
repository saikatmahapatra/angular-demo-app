import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Output() inputValue = new EventEmitter<string>();
  @Input() resetInput!: boolean;
  @Input() placeHolderText = '';
  value = '';
  submitted= false;
  constructor() {
    if (this.resetInput) {
      this.resetInputValue();
    }
  }

  ngOnInit(): void {
  }

  resetInputValue() {
    this.value = '';
  }

  onSubmit(f: NgForm) {
    this.submitted = true;
    this.inputValue.emit(f.value.searchText);
  }

}
