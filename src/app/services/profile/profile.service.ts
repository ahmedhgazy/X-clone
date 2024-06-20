import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { UserInfo, UserActions } from '../../models/user.model';
import { Followers } from '../../models/followers';
environment;
@Injectable({ providedIn: 'root' })
export class ProfileService {
  authS: AuthService = inject(AuthService);
  constructor() {}
  private API = 'https://twitter-api-ld6h.onrender.com/profile/';
  // private API = environment.apiUrl + 'profile/';
  http: HttpClient = inject(HttpClient);

  getUserName(username) {
    return this.http.get<UserInfo>(`${this.API}${username}`);
  }

  getFollowers(username: string) {
    return this.http.get<UserActions>(`${this.API}${username}/count`);
  }
}
