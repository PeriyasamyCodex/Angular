import { TestBed } from '@angular/core/testing';

import { PubgdataService } from './pubgdata.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PubgdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,RouterTestingModule]
  }));

  it('should be created', () => {
    const service: PubgdataService = TestBed.get(PubgdataService);
    expect(service).toBeTruthy();
  });
});
