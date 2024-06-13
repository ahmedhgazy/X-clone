import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-LSidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class LeftSidebarComponent {
  router: Router = inject(Router);

  navToProfile() {
    this.router.navigate(['/profile']);
  }

  authS: AuthService = inject(AuthService);
  logOut() {
    this.router.navigate(['/logout']);
    this.authS.logOut();
  }
}
