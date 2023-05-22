import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMetaComponent } from './site-meta.component';

describe('SiteMetaComponent', () => {
  let component: SiteMetaComponent;
  let fixture: ComponentFixture<SiteMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteMetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
