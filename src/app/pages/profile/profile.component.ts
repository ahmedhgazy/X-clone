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
import { Subscription } from 'rxjs';
import { PRIM_CMP } from '../logout/logout.component';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import {
  UserActions,
  UserInfo,
  UserProfileInfo,
} from '../../models/user.model';
import { MaterialExamples } from '../../constatns/ng-material-itmes';
import { provideNativeDateAdapter } from '@angular/material/core';

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
    MaterialExamples,
    ToastModule,
    ButtonModule,
    RippleModule,
  ],
  providers: [provideNativeDateAdapter(), MessageService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private messageService: MessageService) {}
  router: Router = inject(Router);
  pService: ProfileService = inject(ProfileService);
  authS: AuthService = inject(AuthService);
  sub$: Subscription[] = [];
  username: string;
  name: string;
  LogoChar: string;
  followers: number;
  following: number;
  posts: number;
  createdAt: Date;
  showDate = false;
  birthDate: Date;
  visible: boolean = false;
  USerProfileDetails: UserInfo;
  formGroup: FormGroup;
  userDate: Date = new Date();
  userActions: UserActions;
  userInfo: UserInfo;
  route: ActivatedRoute = inject(ActivatedRoute);
  isExist = false;
  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {
        profileData: { userActions: UserActions; userInfo: UserInfo };
      }) => {
        this.isExist = !!data;
        console.log(this.isExist);

        this.userActions = data.profileData.userActions;
        this.userInfo = data.profileData.userInfo;
        this.username = this.authS.userSub.getValue().username;
        this.name = this.authS.userSub.getValue().name;
        this.initForm();
        this.getUserLogo();
      }
    );
  }

  editProfile() {
    this.visible = true;
  }

  toggleDateMode() {
    this.showDate = !this.showDate;
  }

  getUserLogo() {
    const USERNAME = this.authS.userSub.getValue().username;
    const firstLetter = USERNAME.charAt(0);
    this.LogoChar = firstLetter;
  }

  onSubmit() {
    const bio = this.formGroup.value.bio;
    const location = this.formGroup.value.location;
    const website = this.formGroup.value.website;
    const userBirthDate = new Date(this.formGroup.value.birthDate);
    const userInfo = new UserProfileInfo(bio, location, website, userBirthDate);
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
      bio: new FormControl(this.userInfo?.bio || '', Validators.required),
      location: new FormControl(
        this.userInfo?.location || '',
        Validators.required
      ),
      website: new FormControl(
        this.userInfo?.website || '',
        Validators.required
      ),
      birthDate: new FormControl(
        this.userInfo?.birthDate || '',
        Validators.required
      ),
    });
    this.birthDate = new Date(this.userInfo?.birthDate);
  }

  ngOnDestroy(): void {
    this.sub$.forEach((sub) => sub.unsubscribe());
  }
}
