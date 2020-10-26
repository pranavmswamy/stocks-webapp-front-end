import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteStockComponent } from './favorite-stock.component';

describe('FavoriteStockComponent', () => {
  let component: FavoriteStockComponent;
  let fixture: ComponentFixture<FavoriteStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
