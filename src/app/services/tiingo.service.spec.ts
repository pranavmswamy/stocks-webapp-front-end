import { TestBed } from '@angular/core/testing';

import { TiingoService } from './tiingo.service';

describe('TiingoService', () => {
  let service: TiingoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiingoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
