import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationItems } from './reservation-items';

describe('ReservationItems', () => {
  let component: ReservationItems;
  let fixture: ComponentFixture<ReservationItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationItems],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
