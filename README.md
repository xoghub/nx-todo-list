# Nx Todo List - Team Management & Collaboration

A powerful, full-stack Todo List application designed for team collaboration. Built with a modern monorepo architecture using **Nx**, **Angular**, and **NestJS**.

---

## 🚀 Technology Stack

- **Monorepo Management**: [Nx](https://nx.dev)
- **Frontend**: [Angular](https://angular.io) (Standalone Components)
- **Backend**: [NestJS](https://nestjs.com)
- **Database**: [MySQL](https://www.mysql.com)
- **ORM**: [TypeORM](https://typeorm.io)
- **Authentication**: JWT (JSON Web Token) & Passport
- **Security**: Bcrypt for password hashing

---

## 🏗️ Architecture

Proyek ini menggunakan arsitektur **Monorepo** yang memungkinkan berbagi kode (shared code) antara frontend dan backend melalui **Shared Libraries**.

- **app-display**: Aplikasi frontend Angular.
- **app-server**: Aplikasi backend NestJS.
- **shared**: Library berisi interface, DTO, dan utilitas yang digunakan bersama.

---

## 📁 Struktur Proyek & Penamaan File

### Penamaan File (Naming Convention)
Format: `[nama-file].[fungsi].ts`
- **FE**: `login.page.ts`, `auth.service.ts`, `todo.component.ts`
- **BE**: `auth.controller.ts`, `user.service.ts`, `team.model.ts`

### Struktur Folder Utama
```text
nx-todo-list/
├── app-display/              # Frontend (Angular)
│   └── src/app/
│       ├── auth/             # Login, Register
│       ├── pages/            # Main Todo pages
│       ├── profile/          # User profile
│       └── teams/            # Team management
├── app-server/               # Backend (NestJS)
│   └── src/app/
│       ├── controller/       # HTTP Handlers
│       ├── services/         # Business Logic
│       ├── model/            # Database Entities
│       ├── guards/           # Auth Guards & Strategies
│       └── middleware/       # Pre-request processing
└── shared/                   # Shared Library (DTOs & Interfaces)
```

---

## 💾 Database Schema

### Table: `user`
- `id`: PK, Autoincrement
- `user_code`: Unique code for invitations
- `email`: Unique email
- `password`: Hashed using Bcrypt
- `fullName`: User's full name
- `id_team`: FK to Team table
- `is_verified`: Email verification status

### Table: `team`
- `id`: PK, Autoincrement
- `name`: Team name

### Table: `todo`
- `id`: PK, Autoincrement
- `title`, `description`
- `status`: enum('open', 'pending', 'in-progress', 'done')
- `priority`: enum('low', 'medium', 'high')
- `dueDate`, `reminderTime`
- `userId`: FK to User table

---

## 📡 API Endpoints (Backend)

### Authentication
- `POST /auth/register`: Daftar akun baru
- `POST /auth/login`: Masuk dan dapatkan session token
- `POST /auth/logout`: Keluar dari sesi
- `GET /auth/verify-email`: Verifikasi akun via email

### User & Profile
- `GET /user/profile`: Ambil data profil
- `PUT /user/profile`: Update data profil
- `PUT /user/change-password`: Ganti password user

### Team Management
- `POST /team`: Buat tim baru
- `GET /team/:id`: Lihat detail tim
- `POST /team/invite`: Undang member via `user_code`
- `DELETE /team/:id/leave`: Keluar dari tim

---

## 🛠️ Setup & Installation

### 1. Prasyarat
- Node.js (v18+)
- MySQL Server
- NPM

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment
Salin file `.env` di root atau `app-server/` dan sesuaikan kredensial database Anda:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_DATABASE=nx_todo_list
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

---

## 🏃‍♂️ Running the Application

Jalankan backend dan frontend secara bersamaan atau terpisah:

### Run Backend
```bash
npx nx serve app-server
```

### Run Frontend
```bash
npx nx serve app-display
```

---

## 🧪 Testing

### Test All
```bash
npx nx run-many -t test
```

### Test Specific Project
```bash
npx nx test app-server
npx nx test app-display
```

---

## 🔄 User Flow
`Sign Up` ➡️ `Email Verification` ➡️ `Login` ➡️ `Update Profile` ➡️ `Create/Join Team` ➡️ `Manage Todos`
