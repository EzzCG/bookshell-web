import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  onReservation() {
    this.router.navigate(['/reservations/new']);
  }
}
