import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import {
  UserInfo,
  UserActions,
  UserProfileInfo,
} from '../../models/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, Subject, tap } from 'rxjs';
import { UserPost, UserPosts } from '../../models/post.model';
import { ReturnStatement } from '@angular/compiler';

export interface profileResponse {
  bio?: string;
  birthDate?: string;
  coverImage?: string;
  createdAt?: string;
  isPrivate?: boolean;
  location?: string;
  profileImage?: string;
  updatedAt?: string;
  user?: string;
  website?: string;
}
@Injectable({ providedIn: 'root' })
export class ProfileService {
  profileSubject = new BehaviorSubject<UserInfo>(null);
  authS: AuthService = inject(AuthService);
  constructor() {}
  private API = 'https://twitter-api-ld6h.onrender.com/profile/';
  private APIEnv = environment.apiUrl + 'profile';
  http: HttpClient = inject(HttpClient);
  profileDetailsSub = new BehaviorSubject<profileResponse>(null);

  getUserInfo(username) {
    return this.http.get<UserInfo>(`${this.API}${username}`);
  }

  getUserActions(username: string) {
    return this.http.get<UserActions>(`${this.API}${username}/count`);
  }

  editProfile(user: UserProfileInfo) {
    this.http
      .patch<profileResponse>(
        'https://twitter-api-ld6h.onrender.com/profile',
        user
      )
      .subscribe();
  }

  getUserPosts(username: string) {
    return this.http.get<UserPost[]>(`${this.API}${username}/posts`);
  }

  getUserLogo(username) {
    const firstLetter = username.charAt(0);
    return firstLetter;
  }

  getPostLikes(id: string) {
    return this.http.get<any>(
      `https://twitter-api-ld6h.onrender.com/likes/${id}`
    );
  }
}
