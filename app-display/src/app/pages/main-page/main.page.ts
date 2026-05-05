import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="main-container">
      <header>
        <h1>Todo List</h1>
        <nav>
          <a routerLink="/profile">Profile</a>
          <a routerLink="/teams">Teams</a>
          <button (click)="logout()">Logout</button>
        </nav>
      </header>
      <main>
        <div class="filters">
          <button>Today</button>
          <button>This Week</button>
          <button class="active">All</button>
        </div>
        <div class="todo-list">
          <p>No todos found. Add your first todo!</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .main-container { padding: 20px; }
    header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; }
    nav a, nav button { margin-left: 15px; }
    .filters { margin: 20px 0; }
    .filters button { margin-right: 10px; padding: 5px 15px; border: 1px solid #ccc; background: white; cursor: pointer; }
    .filters button.active { background: #007bff; color: white; border-color: #007bff; }
  `]
})
export class MainPage {
  logout() {
    console.log('Logging out...');
  }
}
