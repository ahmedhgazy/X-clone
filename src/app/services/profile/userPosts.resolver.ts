import { map, of, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { ProfileService } from './profile.service';
import { inject } from '@angular/core';
import { UserPost } from '../../models/post.model';

export const PostsResolve = () => {
  const ps: ProfileService = inject(ProfileService);
  const user: User | null = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return ps.getUserPosts(user.username);
  } else {
    return of([]);
  }
};
