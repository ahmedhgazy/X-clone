import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../profile/profile.service';
import { User } from '../../models/user.model';
import { tap } from 'rxjs';
import { Post, UserPost } from '../../models/post.model';

export interface PostResponse {
  id: number;
  user: string;
  repost: string;
  content: string;
  images: string[];
  type: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor() {}
  profileService: ProfileService = inject(ProfileService);
  private APIUrl = environment.apiUrl;
  http: HttpClient = inject(HttpClient);

  createPost(postData: FormData) {
    const user: User | null = JSON.parse(localStorage.getItem('user'));
    return this.http.post<UserPost>(
      'https://twitter-api-ld6h.onrender.com/posts',
      postData
    );
  }
}
