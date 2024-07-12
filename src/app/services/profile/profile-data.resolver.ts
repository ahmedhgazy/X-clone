// import { catchError, map } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { ProfileService } from './profile.service';
// import { inject } from '@angular/core';
// import { User } from '../../models/user.model';
// export const resolve = () => {
//   const ps: ProfileService = inject(ProfileService);
//   const User: User | null = JSON.parse(localStorage.getItem('user'));
//   if (!User) {
//     return of(null); // Return an empty Observable if there's no user
//   }

//   const username = User.username;

//   return ps.getUserActions(username).pipe(
//     map((userActions) => {
// Handle the userActions here
//       console.log(userActions);
//       return userActions; // Assuming you want to return the same Observable
//     }),
//     catchError((error) => {
//       console.error('Error fetching user actions:', error);
//       return of(null); // Return an empty Observable in case of error
//     })
//   );
// };
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProfileService } from './profile.service';
import { inject } from '@angular/core';
import { User } from '../../models/user.model';

export const resolve = () => {
  const ps: ProfileService = inject(ProfileService);
  const user: User | null = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return of({ userActions: null, userInfo: null }); // Return an empty Observable if there's no user
  }

  const username = user.username;

  return forkJoin({
    userActions: ps.getUserActions(username).pipe(
      catchError((error) => {
        console.error('Error fetching user actions:', error);
        return of(null); // Return an empty Observable in case of error
      })
    ),
    userInfo: ps.getUserName(username).pipe(
      catchError((error) => {
        console.error('Error fetching user info:', error);
        return of(null); // Return an empty Observable in case of error
      })
    ),
  }).pipe(
    map(({ userActions, userInfo }) => {
      return { userActions, userInfo }; // Combine the data into a single object
    })
  );
};
