import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationDemoComponent } from './translation-demo.component';

describe('TranslationDemoComponent', () => {
  let component: TranslationDemoComponent;
  let fixture: ComponentFixture<TranslationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
