import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-details',
  imports: [ReactiveFormsModule],
  templateUrl: './reservation-details.html',
  styleUrl: './reservation-details.scss',
})
export class ReservationDetails {
  @Input({ required: true }) group!: FormGroup;
}
