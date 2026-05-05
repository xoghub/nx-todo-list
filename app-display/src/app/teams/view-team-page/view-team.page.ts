import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-team',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="team-container">
      <h2>Team Management</h2>
      <div class="team-info">
        <h3>Team: Development Team</h3>
        <ul>
          <li>User Name (Admin)</li>
          <li>Other Member</li>
        </ul>
      </div>
      <div class="actions">
        <button>Invite Member</button>
        <button class="danger">Leave Team</button>
      </div>
    </div>
  `,
  styles: [`
    .team-container { max-width: 600px; margin: 20px auto; }
    .team-info { margin-bottom: 20px; }
    button { padding: 10px 20px; cursor: pointer; }
    button.danger { background: #dc3545; color: white; border: none; margin-left: 10px; }
  `]
})
export class ViewTeamPage {}
