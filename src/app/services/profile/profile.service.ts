import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { UserProfileInfo } from '../../models/user.model';
import { UserActions, UserDetails, UserInfo } from '../../models/post.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs';
import { UserPost } from '../../models/post.model';

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
  userPostsSubject = new BehaviorSubject<UserPost[]>(null);
  private postsSubject = new BehaviorSubject<UserPost[]>([]);
  posts$ = this.postsSubject.asObservable();
  userInfoSubject = new BehaviorSubject<UserInfo>(null);
  userActionsSubject = new BehaviorSubject<UserActions>(null);
  authS: AuthService = inject(AuthService);
  constructor() {}
  private API = 'https://twitter-api-ld6h.onrender.com/profile/';
  private LIKES_API = 'https://twitter-api-ld6h.onrender.com/likes/';
  private APIEnv = environment.apiUrl + 'profile';
  http: HttpClient = inject(HttpClient);
  profileDetailsSub = new BehaviorSubject<profileResponse>(null);

  editProfile(user: UserProfileInfo) {
    this.http
      .patch<profileResponse>(
        'https://twitter-api-ld6h.onrender.com/profile',
        user
      )
      .subscribe();
  }

  getUserPosts(username: string) {
    return this.http
      .get<UserPost[]>(`${this.API}${username}/posts`)
      .pipe(tap((posts) => this.postsSubject.next(posts)));
  }

  addUserPost(newPost: UserPost) {
    const currentPosts = this.postsSubject.value;
    this.postsSubject.next([newPost, ...currentPosts]);
  }

  getUserLogo(username) {
    const firstLetter = username.charAt(0);
    return firstLetter;
  }

  getUserInfo(username) {
    return this.http.get<UserInfo>(`${this.API}${username}`).pipe(
      tap((userInfo) => {
        this.userInfoSubject.next(userInfo);
      })
    );
  }
  getUserActions(username: string) {
    return this.http.get<UserActions>(`${this.API}${username}/count`).pipe(
      tap((userActions) => {
        this.userActionsSubject.next(userActions);
      })
    );
  }

  userDetails = new BehaviorSubject<UserDetails>(null);

  public refreshData(username: string) {
    this.getUserInfo(username);
    this.getUserActions(username);
    this.getUserPosts(username);
  }
}
