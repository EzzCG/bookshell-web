import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDetails } from './reservation-details';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('ReservationDetails', () => {
  let component: ReservationDetails;
  let fixture: ComponentFixture<ReservationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationDetails, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationDetails);
    component = fixture.componentInstance;

    component.group = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      notes: new FormControl(''),
    });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
