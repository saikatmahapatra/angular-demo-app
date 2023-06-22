import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightChartComponent } from './insight-chart.component';

describe('InsightChartComponent', () => {
  let component: InsightChartComponent;
  let fixture: ComponentFixture<InsightChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
