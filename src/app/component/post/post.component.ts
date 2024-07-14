import { Component, inject, Input, OnInit } from '@angular/core';
import { UserPost } from '../../models/post.model';
import { ProfileService } from '../../services/profile/profile.service';
import { CommonModule } from '@angular/common';
import { log } from 'node:console';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  @Input() post: UserPost;
  @Input() username: string;
  createdAt: Date;
  PS: ProfileService = inject(ProfileService);
  logo: string;

  PostLikes: any;
  ngOnInit(): void {
    this.logo = this.PS.getUserLogo(this.username);
    this.createdAt = new Date(this.post.createdAt);
    this.PS.getPostLikes(this.post.id).subscribe();
  }
}
