import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationItems } from './reservation-items';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

describe('ReservationItems', () => {
  let component: ReservationItems;
  let fixture: ComponentFixture<ReservationItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationItems],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationItems);
    component = fixture.componentInstance;

    component.items = new FormArray([
      new FormGroup({
        bookSearch: new FormControl(''),
        bookId: new FormControl(1),
        quantity: new FormControl(1),
        comment: new FormControl('Clean Code'),
        days: new FormControl(7),
      }),
    ]);

    component.bookSuggestions = {
      0: [
        {
          id: 1,
          title: 'Clean Code',
          author: 'Robert C. Martin',
        },
      ],
    };

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
