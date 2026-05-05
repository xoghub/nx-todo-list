import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h2>Your Profile</h2>
      <div class="profile-info">
        <p><strong>Name:</strong> User Name</p>
        <p><strong>Email:</strong> user@example.com</p>
        <p><strong>User Code:</strong> ABC123</p>
      </div>
      <button routerLink="/profile/edit">Edit Profile</button>
      <button class="danger">Delete Account</button>
    </div>
  `,
  styles: [`
    .profile-container { max-width: 600px; margin: 20px auto; }
    .profile-info { margin-bottom: 20px; padding: 15px; background: #f9f9f9; }
    button { padding: 10px 20px; cursor: pointer; }
    button.danger { background: #dc3545; color: white; border: none; margin-left: 10px; }
  `]
})
export class ProfilePage {}
