import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShellComponent } from './shell/app-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('bookshell-web');
}
