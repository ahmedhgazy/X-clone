import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { PRIM_CMP } from '../../pages/logout/logout.component';
import { PostService } from '../../services/posts/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-LSidebar',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, PRIM_CMP],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class LeftSidebarComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  profileS: ProfileService = inject(ProfileService);
  authS: AuthService = inject(AuthService);
  postService: PostService = inject(PostService);
  userName;
  userLogo: string;
  router: Router = inject(Router);
  name: string;
  visible = false;
  ngOnInit(): void {
    this.authS.userSub.subscribe((user) => {
      if (!user) {
        return;
      }
      this.userName = user.username;
      this.userLogo = user.username.charAt(0);
      this.userLogo = user.username.charAt(0);
      this.name = user.name;
    });
    this.initForm();
  }

  navToProfile() {
    this.router.navigate(['/profile']);
  }

  logOut() {
    this.router.navigate(['/logout']);
    this.authS.logOut();
  }

  //**************** Posts Form ***************//

  formGroup: FormGroup;

  editProfile() {
    this.visible = true;
  }
  onSubmit() {
    const post: Post = this.formGroup.value;
    console.log(this.formGroup.value);
    this.postService.createPost(post);
  }

  private initForm() {
    this.formGroup = new FormGroup({
      post: new FormControl(''),
    });
  }
}
