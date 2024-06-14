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
  sub$: Subscription[] = [];
  username = this.authS.userSub.getValue().username;
  LogoChar;
  name = this.authS.userSub.getValue().name;

  ngOnInit(): void {
    this.authS.userSub.subscribe((user) => {
      if (user) {
        this.username = user.username;
      }
    });
    this.getUserInfo();
    this.getUserLogo();
  }

  getUserInfo() {
    this.pService.getUserName(this.username).subscribe();
  }

  ngOnDestroy(): void {
    this.sub$.forEach((sub) => sub.unsubscribe());
  }

  getUserLogo() {
    const USERNAME = this.authS.userSub.getValue().username;
    const firstLetter = USERNAME.charAt(0); // "H"
    this.LogoChar = firstLetter;
  }
}
