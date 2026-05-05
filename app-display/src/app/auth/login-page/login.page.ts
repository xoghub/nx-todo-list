import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (submit)="onLogin()">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required />
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a routerLink="/register">Register</a></p>
    </div>
  `,
  styles: [`
    .login-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; }
    input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; }
    button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; }
  `]
})
export class LoginPage {
  email = '';
  password = '';
  private router = inject(Router);

  constructor() { /* empty */ }

  onLogin() {
    console.log('Login attempt', this.email);
    // Implementation for login service call would go here
    this.router.navigate(['/main']);
  }
}
