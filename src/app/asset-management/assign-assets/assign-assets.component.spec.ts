import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAssetsComponent } from './assign-assets.component';

describe('AssignAssetsComponent', () => {
  let component: AssignAssetsComponent;
  let fixture: ComponentFixture<AssignAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignAssetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
