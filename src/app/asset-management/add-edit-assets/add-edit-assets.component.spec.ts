import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAssetsComponent } from './add-edit-assets.component';

describe('AddEditAssetsComponent', () => {
  let component: AddEditAssetsComponent;
  let fixture: ComponentFixture<AddEditAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAssetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
