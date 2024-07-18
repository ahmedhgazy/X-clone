import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PRIM_CMP } from '../logout/logout.component';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { UserProfileInfo } from '../../models/user.model';
import { UserActions, UserDetails, UserInfo } from '../../models/post.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PostsComponent } from '../../component/posts/posts.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinner,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    PRIM_CMP,
    AvatarModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    PostsComponent,
  ],
  providers: [provideNativeDateAdapter(), MessageService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}
  router: Router = inject(Router);
  pService: ProfileService = inject(ProfileService);
  authS: AuthService = inject(AuthService);
  sub$: Subscription[] = [];
  LogoChar: string;
  showDate = false;
  birthDate: Date;
  visible: boolean = false;
  formGroup: FormGroup;
  userDate: Date = new Date();
  userActions$: Observable<UserActions>;
  userInfo$: Observable<UserInfo>;
  endSubs$: Subject<any> = new Subject();

  load = false;
  user: {
    username: string;
    name: string;
  };

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.user = {
        username: user.username,
        name: user.name,
      };

      this.userActions$ = this.pService.getUserActions(user.username);

      this.userInfo$ = this.pService.getUserInfo(user.username);

      this.getUserLogo();
      this.initForm(); // Initialize the form
    }
  }

  editProfile() {
    this.visible = true;
  }

  toggleDateMode() {
    this.showDate = !this.showDate;
  }

  getUserLogo() {
    this.LogoChar = this.pService.getUserLogo(this.user.username);
  }

  onSubmit() {
    const bio = this.formGroup.value.bio;
    const location = this.formGroup.value.location;
    const website = this.formGroup.value.website;
    const userBirthDate = new Date(this.formGroup.value.birthDate);
    const userInfo = new UserProfileInfo(bio, location, website, userBirthDate);
    this.birthDate = userBirthDate;
    this.pService.editProfile(userInfo);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your profile updated successfully',
    });
    setTimeout(() => {
      this.visible = false;
    }, 100);
  }

  private initForm() {
    this.formGroup = new FormGroup({
      bio: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
    });

    // Fetch user info and set form values
    this.pService
      .getUserInfo(this.user.username)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((userInfo) => {
        if (userInfo) {
          this.setUserFormValues(userInfo);
          this.birthDate = new Date(userInfo.birthDate);
        }
      });
  }

  // Separate method to set form values
  private setUserFormValues(userInfo: any) {
    this.formGroup.setValue({
      bio: userInfo.bio || '',
      location: userInfo.location || '',
      website: userInfo.website || '',
      birthDate: userInfo.birthDate || '',
    });
    this.birthDate = new Date(userInfo.birthDate);

    this.birthDate = new Date(userInfo.birthDate);
  }

  navtoPosts() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.endSubs$.next(() => {});
    this.endSubs$.complete();
  }
}
