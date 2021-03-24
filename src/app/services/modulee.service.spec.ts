import { TestBed } from '@angular/core/testing';

import { ModuleeService } from './modulee.service';

describe('ModuleeService', () => {
  let service: ModuleeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
