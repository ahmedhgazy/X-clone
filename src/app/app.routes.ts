import { Routes } from '@angular/router';
import { Logout } from './pages/logout/logout.component';
import { LoginComponent } from './pages/login/login.component';
import { MainContent } from './pages/home/main-content.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'logout',
    pathMatch: 'full',
  },
  {
    path: 'logout',
    component: Logout,
  },
  {
    path: 'home',
    component: MainContent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
