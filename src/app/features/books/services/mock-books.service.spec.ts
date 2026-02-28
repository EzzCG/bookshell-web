import { TestBed } from '@angular/core/testing';

import { MockBooksService } from './mock-books.service';

describe('MockBooksService', () => {
  let service: MockBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
