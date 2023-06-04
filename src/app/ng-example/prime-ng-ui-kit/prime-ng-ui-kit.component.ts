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
  products: any = [
  {
    "id": "1000",
    "code": "f230fh0g3",
    "name": "Bamboo Watch",
    "description": "Product Description",
    "image": "bamboo-watch.jpg",
    "price": 65,
    "category": "Accessories",
    "quantity": 24,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  },
  {
    "id": "1001",
    "code": "nvklal433",
    "name": "Black Watch",
    "description": "Product Description",
    "image": "black-watch.jpg",
    "price": 72,
    "category": "Accessories",
    "quantity": 61,
    "inventoryStatus": "INSTOCK",
    "rating": 4
  },
  {
    "id": "1002",
    "code": "zz21cz3c1",
    "name": "Blue Band",
    "description": "Product Description",
    "image": "blue-band.jpg",
    "price": 79,
    "category": "Fitness",
    "quantity": 2,
    "inventoryStatus": "LOWSTOCK",
    "rating": 3
  },
  {
    "id": "1003",
    "code": "244wgerg2",
    "name": "Blue T-Shirt",
    "description": "Product Description",
    "image": "blue-t-shirt.jpg",
    "price": 29,
    "category": "Clothing",
    "quantity": 25,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  },
  {
    "id": "1004",
    "code": "h456wer53",
    "name": "Bracelet",
    "description": "Product Description",
    "image": "bracelet.jpg",
    "price": 15,
    "category": "Accessories",
    "quantity": 73,
    "inventoryStatus": "INSTOCK",
    "rating": 4
  },
  {
    "id": "1005",
    "code": "av2231fwg",
    "name": "Brown Purse",
    "description": "Product Description",
    "image": "brown-purse.jpg",
    "price": 120,
    "category": "Accessories",
    "quantity": 0,
    "inventoryStatus": "OUTOFSTOCK",
    "rating": 4
  },
  {
    "id": "1006",
    "code": "bib36pfvm",
    "name": "Chakra Bracelet",
    "description": "Product Description",
    "image": "chakra-bracelet.jpg",
    "price": 32,
    "category": "Accessories",
    "quantity": 5,
    "inventoryStatus": "LOWSTOCK",
    "rating": 3
  },
  {
    "id": "1007",
    "code": "mbvjkgip5",
    "name": "Galaxy Earrings",
    "description": "Product Description",
    "image": "galaxy-earrings.jpg",
    "price": 34,
    "category": "Accessories",
    "quantity": 23,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  },
  {
    "id": "1008",
    "code": "vbb124btr",
    "name": "Game Controller",
    "description": "Product Description",
    "image": "game-controller.jpg",
    "price": 99,
    "category": "Electronics",
    "quantity": 2,
    "inventoryStatus": "LOWSTOCK",
    "rating": 4
  },
  {
    "id": "1009",
    "code": "cm230f032",
    "name": "Gaming Set",
    "description": "Product Description",
    "image": "gaming-set.jpg",
    "price": 299,
    "category": "Electronics",
    "quantity": 63,
    "inventoryStatus": "INSTOCK",
    "rating": 3
  }
];

  constructor() { }

  ngOnInit(): void {
  }

}
