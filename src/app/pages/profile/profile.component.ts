// import { CommonModule } from '@angular/common';
// import {
//   Component,
//   ChangeDetectionStrategy,
//   OnDestroy,
//   OnInit,
//   inject,
//   ViewChild,
//   ElementRef,
// } from '@angular/core';
// import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
// import { ProfileService } from '../../services/profile/profile.service';
// import { AuthService } from '../../services/auth/auth.service';
// import { Subscription } from 'rxjs';
// import { PRIM_CMP } from '../logout/logout.component';
// import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
// import { AvatarModule } from 'primeng/avatar';
// import { MessageService } from 'primeng/api';
// import { ToastModule } from 'primeng/toast';
// import { ButtonModule } from 'primeng/button';
// import { RippleModule } from 'primeng/ripple';

// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { CalendarModule } from 'primeng/calendar';
// import {
//   UserActions,
//   UserInfo,
//   UserProfileInfo,
// } from '../../models/user.model';
// import { MaterialExamples } from '../../constatns/ng-material-itmes';
// import { provideNativeDateAdapter } from '@angular/material/core';
// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     LoadingSpinner,
//     ReactiveFormsModule,
//     CalendarModule,
//     FormsModule,
//     PRIM_CMP,
//     AvatarModule,
//     MaterialExamples,
//     ToastModule,
//     ButtonModule,
//     RippleModule,
//   ],
//   providers: [provideNativeDateAdapter(), MessageService],

//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ProfileComponent implements OnInit, OnDestroy {
//   constructor(private messageService: MessageService) {}
//   router: Router = inject(Router);
//   private fb: FormBuilder;
//   pService: ProfileService = inject(ProfileService);
//   authS: AuthService = inject(AuthService);
//   sub$: Subscription[] = [];
//   username = this.authS.userSub.getValue().username;
//   name = this.authS.userSub.getValue().name;
//   LogoChar;
//   followers: number;
//   following: number;
//   posts: number;
//   createdAt: Date;
//   showDate = false;
//   birthDate: Date;
//   visible: boolean = false;
//   USerProfileDetails: UserInfo;
//   formGroup: FormGroup;
//   userDate: Date = new Date();
//   userActions: UserActions;
//   userInfo: UserInfo;
//   route: ActivatedRoute = inject(ActivatedRoute);
//   ngOnInit(): void {
//     // this.userActions = this.route.snapshot.data['userActions'];
//     this.route.data.subscribe(
//       (data: { profileData: { userActions: any; userInfo: any } }) => {
//         this.userActions = data.profileData.userActions;
//         this.userInfo = data.profileData.userInfo;
//       }
//     );
//     this.sub$.push(
//       this.authS.userSub.subscribe((user) => {
//         if (user) {
//           this.username = user.username;
//         }
//         this.getUserInfo(this.username);
//         this.getUserActions(this.username);
//       })
//     );

//     this.getUserLogo();
//     this.initForm();
//   }

//   editProfile() {
//     this.visible = true;
//   }

//   toggleDateMode() {
//     this.showDate = !this.showDate;
//   }

//   getUserInfo(username) {
//     this.sub$.push(
//       this.pService.getUserName(username).subscribe((userData) => {
//         this.pService.profileSubject.next(userData);
//         this.createdAt = new Date(userData.createdAt);
//       })
//     );
//   }

//   getUserLogo() {
//     const USERNAME = this.authS.userSub.getValue().username;
//     const firstLetter = USERNAME.charAt(0);
//     this.LogoChar = firstLetter;
//   }

//   getUserActions(username: string) {
//     this.sub$.push(
//       this.pService.getUserActions(username).subscribe({
//         next: (actions: UserActions) => {
//           this.followers = actions.followers;
//           this.following = actions.following;
//           this.posts = actions.posts;
//         },
//         error: (err) => {
//           console.error(err);
//         },
//       })
//     );
//   }

//   onSubmit() {
//     let bio = this.formGroup.value.bio;
//     let location = this.formGroup.value.location;
//     let website = this.formGroup.value.website;
//     let birthDate = this.formGroup.value.birthDate;
//     let userBirthDate = new Date(this.formGroup.value.birthDate);
//     this.userBirthDate = userBirthDate;
//     const userInfo = new UserProfileInfo(bio, location, website, userBirthDate);
//     this.pService.editProfile(userInfo);
//     this.messageService.add({
//       severity: 'success',
//       summary: 'Success',
//       detail: 'Your profile updated successfully',
//     });
//     setTimeout(() => {
//       this.visible = false;
//     }, 100);
//   }

//   userBirthDate: Date;

//   private initForm() {
//     // Initialize the form with empty values or default values
//     this.formGroup = new FormGroup({
//       bio: new FormControl('', Validators.required),
//       location: new FormControl('', Validators.required),
//       website: new FormControl('', Validators.required),
//       birthDate: new FormControl('', Validators.required),
//     });

//     // Fetch user info and set form values
//     this.sub$.push(
//       this.pService.getUserName(this.username).subscribe((userInfo) => {
//         if (userInfo) {
//           console.log(userInfo);
//           this.setUserFormValues(userInfo);
//           this.userBirthDate = new Date(userInfo.birthDate);
//         }
//       })
//     );
//   }

//   // Separate method to set form values
//   private setUserFormValues(userInfo: any) {
//     this.formGroup.setValue({
//       bio: userInfo.bio || '',
//       location: userInfo.location || '',
//       website: userInfo.website || '',
//       birthDate: userInfo.birthDate || '',
//     });
//     this.birthDate = new Date(userInfo.birthDate);

//     this.birthDate = new Date(userInfo.birthDate);
//   }

//   ngOnDestroy(): void {
//     this.sub$.forEach((sub) => sub.unsubscribe());
//   }
// }
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
import { Observable, Subscription } from 'rxjs';
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
import {
  UserActions,
  UserInfo,
  UserProfileInfo,
} from '../../models/user.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PostsComponent } from './posts/posts.component';
import { UserPosts } from '../../models/post.model';

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
    this.LogoChar = this.pService.getUserLogo(this.username);
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

  navtoPosts() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.sub$.forEach((sub) => sub.unsubscribe());
  }
}
