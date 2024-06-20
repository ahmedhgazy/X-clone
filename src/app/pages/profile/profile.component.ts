import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { PRIM_CMP } from '../logout/logout.component';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinner,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    PRIM_CMP,
  ],
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
  followers: number;
  following: number;
  posts: number;
  createdAt: Date;
  showDate = false;
  birthDate: Date;
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }
  ngOnInit(): void {
    this.authS.userSub.subscribe((user) => {
      if (user) {
        // const usernameWithoutSpaces = username.replace(/\s+/g, '');
        this.username = user.username;
        const userNameWS = user.username.replace(/\s+/g, '');
        console.log(user.username);

        this.getFollowers(userNameWS);
      }
    });
    this.getUserInfo();
    this.getUserLogo();
  }

  getUserInfo() {
    this.pService.getUserName(this.username).subscribe((userData) => {
      this.createdAt = new Date(userData.createdAt);
    });
  }

  ngOnDestroy(): void {
    this.sub$.forEach((sub) => sub.unsubscribe());
  }

  getUserLogo() {
    const USERNAME = this.authS.userSub.getValue().username;
    const firstLetter = USERNAME.charAt(0); // "H"
    this.LogoChar = firstLetter;
  }

  getFollowers(username: string) {
    this.pService.getFollowers(username).subscribe(
      (userInfo) => {
        this.followers = userInfo.followers;
        this.following = userInfo.following;
        this.posts = userInfo.posts;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(form) {}

  toggleDateMode() {
    this.showDate = !this.showDate;
  }
}
