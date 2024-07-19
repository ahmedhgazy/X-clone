import { Component, inject, Input, OnInit } from '@angular/core';
import { UserPost } from '../../models/post.model';
import { ProfileService } from '../../services/profile/profile.service';
import { CommonModule } from '@angular/common';
import { TextDirectionDirective } from '../../shared/directives/text-direction.directive';
import { getTextDirection } from '../../shared/utilities/text-direction';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, TextDirectionDirective],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: UserPost;
  @Input() username: string;
  createdAt: Date;
  PS: ProfileService = inject(ProfileService);
  logo: string;

  ngOnInit(): void {
    this.logo = this.PS.getUserLogo(this.username);
    this.createdAt = new Date(this.post.post.createdAt);
  }

  getTextDirection(text: string): 'rtl' | 'ltr' {
    return getTextDirection(text);
  }

  like() {
    if (!this.post) {
      return;
    }
    this.PS.like(this.post.post._id).subscribe((like) => {
      console.log('Like is ' + like);
    });
  }
}
