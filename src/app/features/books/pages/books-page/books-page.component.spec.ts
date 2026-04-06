import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksPage } from './books-page.component';
import { of } from 'rxjs';
import { BooksFacade } from '../../../../state/books/books.facade';

describe('BooksPage', () => {
  let component: BooksPage;
  let fixture: ComponentFixture<BooksPage>;

  const booksFacadeMock = {
    books$: of([]),
    loading$: of(false),
    error$: of(null),
    enter: vi.fn(),
    search: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPage],
      providers: [{ provide: BooksFacade, useValue: booksFacadeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
