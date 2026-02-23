import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { finalize } from 'rxjs';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loading = signal(false);

  form = new FormBuilder().nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  submit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.loading.set(true);
    // const { email, password } = this.form.value as { email: string; password: string }; // not safe
    const { email, password } = this.form.getRawValue(); // safe because we used nonNullable
    this.auth
      .login(email, password)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          // if guard passed redirect in query param -> go there, else default to /books
          const redirect = this.route.snapshot.queryParamMap.get('redirect') ?? '/books';
          this.router.navigateByUrl(redirect);
        },
        error: (err) => {
          // keep component minimal — AuthService already notified user
          console.error('login error', err);
        },
      });
  }
}
