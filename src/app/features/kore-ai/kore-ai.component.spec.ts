import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoreAiComponent } from './kore-ai.component';

describe('KoreAiComponent', () => {
  let component: KoreAiComponent;
  let fixture: ComponentFixture<KoreAiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoreAiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoreAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
