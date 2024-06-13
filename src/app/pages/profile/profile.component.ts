import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  date: Date = new Date();
  pService: ProfileService = inject(ProfileService);
  authS: AuthService = inject(AuthService);
  userName: User;
  sub$: Subscription[] = [];
  ngOnInit(): void {
    this.userName = this.authS.getCurrentUser();
    this.getUserInfo(this.userName.username);
  }

  getUserInfo(username: string) {
    this.pService.getUserInfo(username).subscribe();
  }

  ngOnDestroy(): void {
    this.sub$.forEach((sub) => sub.unsubscribe());
  }
}
