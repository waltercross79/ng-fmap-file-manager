import { TestBed } from '@angular/core/testing';

import { FmapImportService } from './fmap-import.service';

describe('FmapImportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FmapImportService = TestBed.get(FmapImportService);
    expect(service).toBeTruthy();
  });
});
