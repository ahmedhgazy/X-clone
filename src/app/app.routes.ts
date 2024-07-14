import { Routes } from '@angular/router';
import { Logout } from './pages/logout/logout.component';

import { MainContent } from './pages/main-content/main-content.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './services/auth/auth.guard';
import { NotificationComponent } from './pages/notification/notification.component';
import { resolve } from './services//profile/profile-data.resolver';
import { PostsComponent } from './pages/profile/posts/posts.component';
import { PostsResolve } from './services/profile/userPosts.resolver';
import { RepliesComponent } from './replies/replies.component';
import { MediaComponent } from './media/media.component';
import { LikesComponent } from './likes/likes.component';
export const routes: Routes = [
  {
    path: '',
    component: MainContent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: { profileData: resolve },
        children: [
          {
            path: '',
            component: PostsComponent,
            resolve: { userPosts: PostsResolve },
          },
          {
            path: 'replies',
            component: RepliesComponent,
          },
          {
            path: 'media',
            component: MediaComponent,
          },
          {
            path: 'likes',
            component: LikesComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'logout',
    component: Logout,
  },
];
