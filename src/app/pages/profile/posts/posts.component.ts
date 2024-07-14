import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import { UserPost } from '../../../models/post.model';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostComponent } from '../../../component/post/post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterModule, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  username: string;
  ps: ProfileService = inject(ProfileService);
  userPosts: UserPost[];
  authS: AuthService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    this.route.data.subscribe(
      (data: { userPosts: { userPosts: UserPost[]; username: string } }) => {
        this.userPosts = data.userPosts.userPosts;
        this.username = data.userPosts.username;
      }
    );
  }
}
