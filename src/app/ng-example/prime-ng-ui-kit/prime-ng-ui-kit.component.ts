import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prime-ng-ui-kit',
  templateUrl: './prime-ng-ui-kit.component.html',
  styleUrls: ['./prime-ng-ui-kit.component.scss']
})
export class PrimeNgUiKitComponent implements OnInit {

  checked = true;
  sliderVal: number = 30;
  ratingVal: number = 3;
  selectedRadio: string = 'R';
  selectedRadio2: string = '2';
  value17 = 10;
  expanded = true;
  optionCategoriesInline: any[] = [{ name: 'Option 1', key: 'A' }, { name: 'Option 2', key: 'M' }, { name: 'Option 3 (disabled)', key: 'R' }];
  optionCategoriesBlock: any[] = [{ name: 'Option 1', key: '1' }, { name: 'Option 2', key: '2' }, { name: 'Option 3 (disabled)', key: '3' }];
  selectedCheckboxCategories1: any[] = [{ name: 'Option 3 (disabled)', key: 'op3' }];
  selectedCheckboxCategories2: any[] = [{ name: 'Option 2', key: 'o2' }];
  selectedListboxOptions: any[] = [{ name: 'Option 1', code: 'opt1' }];
  checkboxCategoriesInline: any[] = [{ name: 'Option 1', key: 'op1' }, { name: 'Option 2', key: 'op2' }, { name: 'Option 3 (disabled)', key: 'op3' }];
  checkboxCategoriesBlock: any[] = [{ name: 'Option 1', key: 'o1' }, { name: 'Option 2', key: 'o2' }, { name: 'Option 3 (disabled)', key: 'o3' }];
  listboxOptions: any[] = [
    { name: 'Option 1', code: 'opt1' },
    { name: 'Option 2', code: 'opt2' },
    { name: 'Option 3', code: 'opt3' }
  ];

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
    { name: 'California', code: 'CAF' },
    { name: 'Ohio', code: 'OHI' },
    { name: 'Cosa', code: 'COS' },
    { name: 'Modoetia', code: 'MOD' }
  ];

  selectedCity1 = { name: 'Rome', code: 'RM' };
  selectedCities2 = '';
  activeItem = [];
  items = [];

  constructor() { }

  ngOnInit(): void {
  }

}
