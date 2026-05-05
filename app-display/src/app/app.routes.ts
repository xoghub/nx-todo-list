import { Route } from '@angular/router';
import { LoginPage } from './auth/login-page/login.page';
import { RegisterPage } from './auth/register-page/register.page';
import { MainPage } from './pages/main-page/main.page';
import { ProfilePage } from './profile/profile-page/profile.page';
import { ViewTeamPage } from './teams/view-team-page/view-team.page';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'main', component: MainPage },
  { path: 'profile', component: ProfilePage },
  { path: 'teams', component: ViewTeamPage },
];
