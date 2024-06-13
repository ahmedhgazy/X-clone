import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
environment;
@Injectable({ providedIn: 'root' })
export class ProfileService {
  auth: AuthService = inject(AuthService);
  constructor() {}
  private API = 'https://twitter-api-ld6h.onrender.com/profile/';
  // private API = environment.apiUrl + 'profile/';
  http: HttpClient = inject(HttpClient);
  USERNAME: string;

  getUserName() {
    this.auth.userSub.subscribe((user) => {
      this.USERNAME = user.username;
    });
  }
  getUserInfo(username: string) {
    return this.http.get<string>(`${this.API}${username}`);
  }
}
