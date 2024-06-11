import { Routes } from '@angular/router';
import { Logout } from './pages/logout/logout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

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
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
