import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNewsElementComponent } from './stock-news-element.component';

describe('StockNewsElementComponent', () => {
  let component: StockNewsElementComponent;
  let fixture: ComponentFixture<StockNewsElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockNewsElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNewsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
