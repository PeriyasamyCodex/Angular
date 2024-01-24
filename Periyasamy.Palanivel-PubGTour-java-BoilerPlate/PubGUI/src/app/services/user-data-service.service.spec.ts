import { TestBed } from '@angular/core/testing';

import { UserDataServiceService } from './user-data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule,RouterTestingModule]
  }));

  it('should be created', () => {
    const service: UserDataServiceService = TestBed.get(UserDataServiceService);
    expect(service).toBeTruthy();
  });
});
