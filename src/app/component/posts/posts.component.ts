import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { UserPost } from '../../models/post.model';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { TrackByFunction } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TextDirectionDirective } from '../../shared/directives/text-direction.directive';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterModule, PostComponent, TextDirectionDirective],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit, OnDestroy {
  username: string;
  ps: ProfileService = inject(ProfileService);
  userPosts$: Observable<UserPost[]>;
  endSubs$: Subject<any> = new Subject();

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    this.username = user.username;
    this.userPosts$ = this.ps.posts$;
    this.ps
      .getUserPosts(this.username)
      .pipe(takeUntil(this.endSubs$))
      .subscribe();
  }
  ngOnDestroy(): void {
    this.endSubs$.next(() => {});
    this.endSubs$.complete();
  }
}
