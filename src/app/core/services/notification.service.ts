import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snack = inject(MatSnackBar);

  private open(message: string, panelClass: string) {
    this.snack.open(message, 'OK', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass],
    });
  }

  success(message: string) {
    this.open(message, 'snackbar-success');
  }

  error(message: string) {
    this.open(message, 'snackbar-error');
  }

  info(message: string) {
    this.open(message, 'snackbar-info');
  }
}
