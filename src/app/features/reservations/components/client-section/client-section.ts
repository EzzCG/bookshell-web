import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-section.html',
})
export class ClientSectionComponent {
  @Input({ required: true }) group!: FormGroup;
}
