import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoreAiComponent } from './kore-ai.component';

describe('KoreAiComponent', () => {
  let component: KoreAiComponent;
  let fixture: ComponentFixture<KoreAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoreAiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoreAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
