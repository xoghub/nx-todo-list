import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Register</h2>
      <form (submit)="onRegister()">
        <input type="text" [(ngModel)]="fullName" name="fullName" placeholder="Full Name" required />
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required />
        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a routerLink="/login">Login</a></p>
    </div>
  `,
  styles: [`
    .register-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; }
    input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; }
    button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; }
  `]
})
export class RegisterPage {
  fullName = '';
  email = '';
  password = '';
  private router = inject(Router);

  constructor() { /* empty */ }

  onRegister() {
    console.log('Register attempt', this.email);
    this.router.navigate(['/login']);
  }
}
