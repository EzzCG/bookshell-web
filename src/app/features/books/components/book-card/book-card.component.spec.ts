import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCard } from './book-card.component';
import { Book } from '../../models/book';

describe('BookCardComponent', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCard);
    component = fixture.componentInstance;

    component.book = {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      price: 30,
      description: 'test',
      imageUrl: '',
      available: true,
    } as Book;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
