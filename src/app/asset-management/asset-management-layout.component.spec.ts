import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetManagementLayoutComponent } from './asset-management-layout.component';

describe('AssetManagementLayoutComponent', () => {
  let component: AssetManagementLayoutComponent;
  let fixture: ComponentFixture<AssetManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetManagementLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
