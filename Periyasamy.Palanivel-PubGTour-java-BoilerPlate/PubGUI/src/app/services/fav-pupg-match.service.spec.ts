import { TestBed } from '@angular/core/testing';

import { FavPupgMatchService } from './fav-pupg-match.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('FavPupgMatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,RouterTestingModule]
  }));

  it('should be created', () => {
    const service: FavPupgMatchService = TestBed.get(FavPupgMatchService);
    expect(service).toBeTruthy();
  });
});
