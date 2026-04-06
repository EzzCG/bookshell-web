import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSearch } from './books-search.component';

describe('BooksSearch', () => {
  let component: BooksSearch;
  let fixture: ComponentFixture<BooksSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
