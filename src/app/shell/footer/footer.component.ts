import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styles: [':host{display:block}'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
